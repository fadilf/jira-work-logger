import ForgeUI, { render, Text, Fragment, GlobalPage, useState, Heading, Strong, Table, Head, Row, Cell, Form, TextField, Select, Option, Tooltip, SectionMessage, DatePicker, TextArea } from '@forge/ui';
import api, { route } from "@forge/api";

/**
 * @returns {boolean} True if the date object used falls between the start of the last and next Sunday, false otherwise.
 */
Date.prototype.inThisWeek = function() {
  let weekStart = new Date();
  weekStart = new Date(weekStart.setDate(weekStart.getDate() - weekStart.getDay()));
  weekStart = new Date(weekStart.toDateString());

  let weekEnd = new Date();
  weekEnd = new Date(weekEnd.setDate(weekStart.getDate() + 7));
  weekEnd = new Date(weekEnd.toDateString());

  weekStart = weekStart.getTime();
  weekEnd = weekEnd.getTime();
  let givenTime = this.getTime();

  return (weekStart <= givenTime) && (givenTime < weekEnd);
}

/**
 * @param {number} minutes number of minutes to create string representation of.
 * @returns {string} a string representation of minutes based on Jira rules
 */
function readableTimeStr(minutes) {
  let hours = Math.floor(minutes / 60),
  days = Math.floor(hours / 8),
  weeks = Math.floor(days / 5);
  minutes = minutes % 60,
  hours = hours % 8,
  days = days % 5;

  let timeArr = [];

  if (weeks > 0) {
    timeArr.push(weeks + "w");
  }

  if (days > 0) {
    timeArr.push(days + "d");
  }

  if (hours > 0) {
    timeArr.push(hours + "h");
  }

  if (minutes > 0) {
    timeArr.push(minutes + "m");
  }

  if (timeArr.length == 0) {
    return "0m";
  } else {
    return timeArr.join(" ");
  }
}

/**
 * @param {string} timeStr string representation of a length of time
 * @returns {number} the number of minutes timeStr represents or NaN if timeStr is invalid
 */
function parseMinutes(timeStr) {
  if ([null, "", "0m"].includes(timeStr)) {
      return 0;
  }

  let timeSplit = timeStr.split(" ");
  let timeNum = 0;
  for (const timeThing of timeSplit) {
    let number = timeThing.slice(0, -1),
    unit = timeThing.slice(-1);
    if (number.match(/[^\d]/)) {
      return NaN;
    } else {
      number = parseInt(number);
    }
    switch (unit) {
      case "m":
        timeNum += number;
        break;
      case "h":
        timeNum += number * 60;
        break;
      case "d":
        timeNum += number * 60 * 8;
        break;
      case "w":
        timeNum += number * 60 * 8 * 5;
        break;
      default:
        return NaN;
    }
  }

  return timeNum;
}

/**
 * @returns API call data for issues assigned to current user that are not marked as complete
 */
const fetchAssignedIncompleteIssues = async () => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/search?jql=assignee%3DcurrentUser()%20AND%20statusCategory%20!%3D%20Done&fields=*all`);

  const data = await res.json();
  return data.issues;
};

/**
 * @param {*} data API call data
 * @returns a breakdown of work logged by issue for the current week
 */
const parseTimeWorked = (data) => {
  let worked_on = [],
  total_minutes_this_week = 0;
  for (const issue of data) {
    let issueItem = {};
    issueItem["id"] = issue.id;
    issueItem["key"] = issue.key;
    issueItem["project"] = issue.fields.project.name;
    issueItem["summary"] = issue.fields.summary;
    issueItem["time"] = 0;
    worked_on.push(issueItem);
    for (const worklog of issue.fields.worklog.worklogs) {
      let logDate = new Date(worklog.started);
      if (logDate.inThisWeek()) {
        let logMinutes = parseMinutes(worklog.timeSpent);
        issueItem["time"] += logMinutes;
        total_minutes_this_week += logMinutes;
      }
    }
  }
  return {byIssue: worked_on, total: total_minutes_this_week};
};

const App = () => {
  const [issueData, setIssueData] = useState(async () => await fetchAssignedIncompleteIssues());
  const [formState, setFormState] = useState(undefined);
  const timeWorked = parseTimeWorked(issueData);

  const onSubmit = async (formData) => {
    let minutes = parseMinutes(formData.time);
    formData["minutes"] = minutes;

    if (minutes || minutes === 0) {
      var bodyData = `{
        "timeSpentSeconds": ${minutes * 60}
        ${("comment" in formData) ? `,"comment": {
          "type": "doc",
          "version": 1,
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "text": "${formData.comment}",
                  "type": "text"
                }
              ]
            }
          ]
        }` : ""}
        ${formData.started ? `,"started": "${formData.started}T00:00:00.000+0000"` : ""}
      }`;
  
      const response = await api.asApp().requestJira(route`/rest/api/3/issue/${formData.issue}/worklog`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: bodyData
      });
      
      if (response.status == 201) {
        formData["invalid"] = false;
        formData["formMsg"] = `${formData.time} of work logged for issue ${formData.issue}`;
      } else {
        formData["invalid"] = true;
        formData["formMsg"] = `Response: ${response.status} ${response.statusText}\n${JSON.stringify(await response.json())}`;
      }
    } else {
      formData["invalid"] = true;
      formData["formMsg"] = `Invalid time format supplied: ${formData.time}`;
    }
    setFormState(formData);
  };

  return (
    <Fragment>
      <Fragment>
        <Heading>Time worked so far</Heading>
        <Text>Time worked so far this week: <Strong>{readableTimeStr(timeWorked.total)}</Strong></Text>
        <Table>
          <Head>
            <Cell>
              <Text>ID</Text>
            </Cell>
            <Cell>
              <Text>Key</Text>
            </Cell>
            <Cell>
              <Text>Summary</Text>
            </Cell>
            <Cell>
              <Text>Project</Text>
            </Cell>
            <Cell>
              <Text>Time worked this week</Text>
            </Cell>
          </Head>
          {timeWorked.byIssue.map(issueItem => 
          <Row>
            <Cell>
              <Text>{issueItem.id}</Text>
            </Cell>
            <Cell>
              <Text>{issueItem.key}</Text>
            </Cell>
            <Cell>
              <Text>{issueItem.summary}</Text>
            </Cell>
            <Cell>
              <Text>{issueItem.project}</Text>
            </Cell>
            <Cell>
              <Text>{readableTimeStr(issueItem.time)}</Text>
            </Cell>
          </Row>
          )}
        </Table>
      </Fragment>
      <Fragment>
        <Form onSubmit={onSubmit} submitButtonText="Log work">
          <Heading>Log work in an issue</Heading>
          {formState && <SectionMessage title={formState.invalid ? "Error logging work" : "Work logged"} appearance={formState.invalid ? "error" : "confirmation"}>
            <Text>{formState.formMsg}</Text>
            </SectionMessage>}
          <Select label="Issue" name="issue" isRequired={true}>
            {issueData.map(issueItem => <Option label={`${issueItem.key} - ${issueItem.fields.summary}`} value={`${issueItem.key}`} />)}
          </Select>
          <Tooltip text='Use the format: 2w 4d 6h 45m'>
            <TextField label="Time Spent" name="time" isRequired={true} placeholder="2w 4d 6h 45m" autoComplete="off" />
          </Tooltip>
          <DatePicker name="started" label="Start Date" placeholder="" defaultValue={`${new Date().toISOString().slice(0, 10)}`}/>
          <TextArea label="Work description" name="comment" />
        </Form>
      </Fragment>
    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App/>
  </GlobalPage>
);