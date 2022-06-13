"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = tslib_1.__importStar(require("../"));
test('Text with string children', async () => {
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    expect(await __1.render(__1.default.createElement(__1.IssuePanel, null,
        __1.default.createElement(__1.Text, null, "Example")))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "Example",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Text.0",
                  "props": Object {
                    "format": "markup",
                  },
                  "type": "Text",
                },
              ],
              "key": "IssuePanel.0",
              "props": Object {},
              "type": "IssuePanel",
            },
          ],
          "type": "View",
        },
        "state": Object {},
        "type": "render",
      },
    ]
  `);
    const issuePanelWithCustomActions = await __1.render(__1.default.createElement(__1.IssuePanel, { actions: [
            __1.default.createElement(__1.IssuePanelAction, { text: "Action 1", onClick: () => { } }),
            __1.default.createElement(__1.IssuePanelAction, { text: "Action 2", onClick: () => { } })
        ] },
        __1.default.createElement(__1.Text, null, "Example")))(payload, {});
    expect(issuePanelWithCustomActions).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "key": "IssuePanelAction.0",
                  "props": Object {
                    "onClick": Object {
                      "componentKey": "IssuePanelAction.0",
                      "prop": "onClick",
                    },
                    "text": "Action 1",
                  },
                  "type": "IssuePanelAction",
                },
                Object {
                  "children": Array [],
                  "key": "IssuePanelAction.1",
                  "props": Object {
                    "onClick": Object {
                      "componentKey": "IssuePanelAction.1",
                      "prop": "onClick",
                    },
                    "text": "Action 2",
                  },
                  "type": "IssuePanelAction",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "Example",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Text.0",
                  "props": Object {
                    "format": "markup",
                  },
                  "type": "Text",
                },
              ],
              "key": "IssuePanel.0",
              "props": Object {},
              "type": "IssuePanel",
            },
          ],
          "type": "View",
        },
        "state": Object {},
        "type": "render",
      },
    ]
  `);
    const issuePanelWithChildrenArray = await __1.render(__1.default.createElement(__1.IssuePanel, { actions: [
            __1.default.createElement(__1.IssuePanelAction, { text: "Action 1", onClick: () => { } }),
            __1.default.createElement(__1.IssuePanelAction, { text: "Action 2", onClick: () => { } })
        ] },
        __1.default.createElement(__1.Text, null, "Example"),
        __1.default.createElement(__1.Text, null, "Example2")))(payload, {});
    expect(issuePanelWithChildrenArray).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "key": "IssuePanelAction.0",
                  "props": Object {
                    "onClick": Object {
                      "componentKey": "IssuePanelAction.0",
                      "prop": "onClick",
                    },
                    "text": "Action 1",
                  },
                  "type": "IssuePanelAction",
                },
                Object {
                  "children": Array [],
                  "key": "IssuePanelAction.1",
                  "props": Object {
                    "onClick": Object {
                      "componentKey": "IssuePanelAction.1",
                      "prop": "onClick",
                    },
                    "text": "Action 2",
                  },
                  "type": "IssuePanelAction",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "Example",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Text.0",
                  "props": Object {
                    "format": "markup",
                  },
                  "type": "Text",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "Example2",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Text.1",
                  "props": Object {
                    "format": "markup",
                  },
                  "type": "Text",
                },
              ],
              "key": "IssuePanel.0",
              "props": Object {},
              "type": "IssuePanel",
            },
          ],
          "type": "View",
        },
        "state": Object {},
        "type": "render",
      },
    ]
  `);
});
