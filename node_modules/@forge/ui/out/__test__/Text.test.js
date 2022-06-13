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
    expect(await __1.render(__1.default.createElement(__1.Text, null, "You have 4 PRs"))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": "You have 4 PRs",
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
          "type": "View",
        },
        "state": Object {},
        "type": "render",
      },
    ]
  `);
});
test('Text with function component children', async () => {
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    const InProgressLozenge = () => __1.default.createElement(__1.StatusLozenge, { text: "In progress", appearance: "inprogress" });
    expect(await __1.render(__1.default.createElement(__1.Text, null,
        "You have ",
        __1.default.createElement(__1.Em, null, "4"),
        " ",
        __1.default.createElement(InProgressLozenge, null),
        " PRs"))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": "You have ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "4",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Em.0",
                  "props": Object {},
                  "type": "Em",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": " ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [],
                  "key": "StatusLozenge.0",
                  "props": Object {
                    "appearance": "inprogress",
                    "text": "In progress",
                  },
                  "type": "StatusLozenge",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": " PRs",
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
          "type": "View",
        },
        "state": Object {},
        "type": "render",
      },
    ]
  `);
});
test('Text with function component fragment', async () => {
    const now = new Date('2020-02-16').getUTCMilliseconds();
    Date.now = jest.fn().mockReturnValue(now);
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    const InProgressLozenge = () => (__1.default.createElement(__1.Fragment, null,
        __1.default.createElement(__1.StatusLozenge, { text: "In progress", appearance: "inprogress" }),
        __1.default.createElement(__1.DateLozenge, { value: now })));
    expect(await __1.render(__1.default.createElement(__1.Text, null,
        "You have 4 ",
        __1.default.createElement(InProgressLozenge, null),
        " PRs"))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": "You have 4 ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [],
                  "key": "StatusLozenge.0",
                  "props": Object {
                    "appearance": "inprogress",
                    "text": "In progress",
                  },
                  "type": "StatusLozenge",
                },
                Object {
                  "children": Array [],
                  "key": "DateLozenge.0",
                  "props": Object {
                    "value": 0,
                  },
                  "type": "DateLozenge",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": " PRs",
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
          "type": "View",
        },
        "state": Object {},
        "type": "render",
      },
    ]
  `);
});
test('Text with spaces between inline components', async () => {
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    expect(await __1.render(__1.default.createElement(__1.Text, null,
        __1.default.createElement(__1.StatusLozenge, { text: "ok", appearance: "success" }),
        " ",
        __1.default.createElement(__1.StatusLozenge, { text: "ok", appearance: "success" })))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "key": "StatusLozenge.0",
                  "props": Object {
                    "appearance": "success",
                    "text": "ok",
                  },
                  "type": "StatusLozenge",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": " ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [],
                  "key": "StatusLozenge.1",
                  "props": Object {
                    "appearance": "success",
                    "text": "ok",
                  },
                  "type": "StatusLozenge",
                },
              ],
              "key": "Text.0",
              "props": Object {
                "format": "markup",
              },
              "type": "Text",
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
test('Text with markup format', async () => {
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    expect(await __1.render(__1.default.createElement(__1.Text, null, "This is some text content. The result should be a single node of type String."))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": "This is some text content. The result should be a single node of type String.",
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
          "type": "View",
        },
        "state": Object {},
        "type": "render",
      },
    ]
  `);
});
test('Text with markup format and inline components', async () => {
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    expect(await __1.render(__1.default.createElement(__1.Text, null,
        "Hello this is a lozenge ",
        __1.default.createElement(__1.StatusLozenge, { text: "ok", appearance: "success" }),
        ' ',
        __1.default.createElement(__1.StatusLozenge, { text: "ok", appearance: "success" })))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": "Hello this is a lozenge ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [],
                  "key": "StatusLozenge.0",
                  "props": Object {
                    "appearance": "success",
                    "text": "ok",
                  },
                  "type": "StatusLozenge",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": " ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [],
                  "key": "StatusLozenge.1",
                  "props": Object {
                    "appearance": "success",
                    "text": "ok",
                  },
                  "type": "StatusLozenge",
                },
              ],
              "key": "Text.0",
              "props": Object {
                "format": "markup",
              },
              "type": "Text",
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
test('Text with markup format and nested markup components', async () => {
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    const Strong = 'Strong';
    const Em = 'Em';
    const Strikethrough = 'Strikethrough';
    expect(await __1.render(__1.default.createElement(__1.Text, null,
        "This is some ",
        __1.default.createElement(Strong, null, "bold text"),
        " and some ",
        __1.default.createElement(Em, null, "italic text"),
        ". Finally, some",
        ' ',
        __1.default.createElement(Strong, null,
            __1.default.createElement(Em, null, "bold and italic text"),
            " and ",
            __1.default.createElement(Strikethrough, null, "strikethrough"))))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": "This is some ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "bold text",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Strong.0",
                  "props": Object {},
                  "type": "Strong",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": " and some ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "italic text",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Em.0",
                  "props": Object {},
                  "type": "Em",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": ". Finally, some",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": " ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [
                        Object {
                          "children": Array [],
                          "props": Object {
                            "text": "bold and italic text",
                          },
                          "type": "String",
                        },
                      ],
                      "key": "Em.1",
                      "props": Object {},
                      "type": "Em",
                    },
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": " and ",
                      },
                      "type": "String",
                    },
                    Object {
                      "children": Array [
                        Object {
                          "children": Array [],
                          "props": Object {
                            "text": "strikethrough",
                          },
                          "type": "String",
                        },
                      ],
                      "key": "Strikethrough.0",
                      "props": Object {},
                      "type": "Strikethrough",
                    },
                  ],
                  "key": "Strong.1",
                  "props": Object {},
                  "type": "Strong",
                },
              ],
              "key": "Text.0",
              "props": Object {
                "format": "markup",
              },
              "type": "Text",
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
test('Text with markup format and function components', async () => {
    const payload = {
        context: {},
        state: {},
        effects: [{ type: 'initialize' }],
        config: undefined
    };
    const Strong = 'Strong';
    const CustomMarkup = () => __1.default.createElement(Strong, null, "Custom bold text");
    expect(await __1.render(__1.default.createElement(__1.Text, null,
        "This is some ",
        __1.default.createElement(CustomMarkup, null)))(payload, {})).toMatchInlineSnapshot(`
    Array [
      Object {
        "aux": Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "children": Array [],
                  "props": Object {
                    "text": "This is some ",
                  },
                  "type": "String",
                },
                Object {
                  "children": Array [
                    Object {
                      "children": Array [],
                      "props": Object {
                        "text": "Custom bold text",
                      },
                      "type": "String",
                    },
                  ],
                  "key": "Strong.0",
                  "props": Object {},
                  "type": "Strong",
                },
              ],
              "key": "Text.0",
              "props": Object {
                "format": "markup",
              },
              "type": "Text",
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
