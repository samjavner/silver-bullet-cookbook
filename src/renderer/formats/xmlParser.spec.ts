import { BaseParser, ifPresent, Node } from "./xmlParser";

export function createNode({
    text,
    attributes,
    children,
}: {
    text?: string;
    attributes?: {
        [key: string]: string;
    };
    children?: {
        [key: string]: Node[] | undefined;
    };
} = {}): Node {
    return {
        ...children,
        _: text,
        $: attributes,
    } as any;
}

const textNode = createNode({
    text: "Text!",
});

const textWithWindowsNewlineNode = createNode({
    text: "Line1\r\n\r\nLine2",
});

const noTextNode = createNode({
    attributes: {
        Attribute1: "value1",
    },
    children: {
        Child1: [createNode()],
    },
});

const noChildrenNode = createNode({
    text: "Text!",
    attributes: {
        Attribute1: "value1",
    },
});

const node1a = createNode({ text: "1a" });
const oneChildNode = createNode({
    children: {
        One: [node1a],
    },
});

const node2a = createNode({ text: "2a" });
const node2b = createNode({ text: "2b" });
const twoChildrenNode = createNode({
    children: {
        Two: [node2a, node2b],
    },
});

const childrenNode = createNode({
    children: {
        One: [node1a],
        Two: [node2a, node2b],
    },
});

const attributeNode = createNode({
    attributes: {
        Attribute1: "value1",
    },
});

const attributeWithWindowsNewlineNode = createNode({
    attributes: {
        Attribute1: "value\r\n\r\n1",
    },
});

const numberAttributeNode = createNode({
    attributes: {
        Attribute1: "1.23",
    },
});

const emptyStringAttributeNode = createNode({
    attributes: {
        Attribute1: "",
    },
});

const multipleAttributesNode = createNode({
    attributes: {
        Attribute1: "value1",
        Attribute2: "value2",
        Attribute3: "value3",
    },
});

const noAttributesNode = createNode({
    text: "1a",
    children: {
        One: [node1a],
    },
});

describe("BaseParser", () => {
    let parser: BaseParser;

    beforeEach(() => {
        parser = new BaseParser();
    });

    describe("noText", () => {
        describe("when the node has text content", () => {
            it("should add a warning message", () => {
                parser.noText("Name", textNode);
                expect(parser.warnings).toEqual([
                    "Text content not expected in element <Name>",
                ]);
            });
        });

        describe("when the node does not have text content", () => {
            it("should not add a warning message", () => {
                parser.noText("Name", noTextNode);
                expect(parser.warnings.length).toBe(0);
            });
        });
    });

    describe("optionalText", () => {
        describe("when the node has text content", () => {
            it("should return the text content", () => {
                const actual = parser.optionalText("Name", textNode);
                expect(actual).toBe("Text!");
            });

            it("should normalize newlines", () => {
                const actual = parser.optionalText(
                    "Name",
                    textWithWindowsNewlineNode
                );
                expect(actual).toBe("Line1\n\nLine2");
            });

            it("should not add a warning message", () => {
                parser.optionalText("Name", textNode);
                expect(parser.warnings.length).toBe(0);
            });
        });

        describe("when the node does not have text content", () => {
            it("should return undefined", () => {
                const actual = parser.optionalText("Name", noTextNode);
                expect(actual).toBeUndefined();
            });

            it("should not add a warning message", () => {
                parser.optionalText("Name", noTextNode);
                expect(parser.warnings.length).toBe(0);
            });
        });
    });

    describe("requiredText", () => {
        describe("when the node has text content", () => {
            it("should return the text content", () => {
                const actual = parser.requiredText("Name", textNode);
                expect(actual).toBe("Text!");
            });

            it("should normalize newlines", () => {
                const actual = parser.requiredText(
                    "Name",
                    textWithWindowsNewlineNode
                );
                expect(actual).toBe("Line1\n\nLine2");
            });

            it("should not add a warning message", () => {
                parser.requiredText("Name", textNode);
                expect(parser.warnings.length).toBe(0);
            });
        });

        describe("when the node does not have text content", () => {
            it("should return an empty string", () => {
                const actual = parser.requiredText("Name", noTextNode);
                expect(actual).toBe("");
            });

            it("should add a warning message", () => {
                parser.requiredText("Name", noTextNode);
                expect(parser.warnings).toEqual([
                    "Required text content missing from element <Name>",
                ]);
            });
        });
    });

    describe("noChildren", () => {
        describe("when the node has children", () => {
            it("should add a warning message for each child element name present", () => {
                parser.noChildren("Name", childrenNode);
                expect(parser.warnings).toEqual([
                    "Child <One> not expected in element <Name>",
                    "Child <Two> not expected in element <Name>",
                ]);
            });
        });

        describe("when the node does not have children", () => {
            it("should not add a warning message", () => {
                parser.noChildren("Name", noChildrenNode);
                expect(parser.warnings.length).toBe(0);
            });
        });
    });

    describe("children", () => {
        describe("when an element name is specified as zeroOrMore", () => {
            describe("when that child is not present", () => {
                it("should return an empty array", () => {
                    const actual = parser.children("Name", noChildrenNode, {
                        zeroOrMore: {
                            Zero: true,
                        },
                    });
                    expect(actual.Zero).toEqual([]);
                });

                it("should not add a warning message", () => {
                    parser.children("Name", noChildrenNode, {
                        zeroOrMore: {
                            Zero: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });

            describe("when that child is present one time", () => {
                it("should return an array with the child", () => {
                    const actual = parser.children("Name", oneChildNode, {
                        zeroOrMore: {
                            One: true,
                        },
                    });
                    expect(actual.One).toEqual([node1a]);
                });

                it("should not add a warning message", () => {
                    parser.children("Name", oneChildNode, {
                        zeroOrMore: {
                            One: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });

            describe("when that child is present multiple times", () => {
                it("should return an array with the children", () => {
                    const actual = parser.children("Name", twoChildrenNode, {
                        zeroOrMore: {
                            Two: true,
                        },
                    });
                    expect(actual.Two).toEqual([node2a, node2b]);
                });

                it("should not add a warning message", () => {
                    parser.children("Name", twoChildrenNode, {
                        zeroOrMore: {
                            Two: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });
        });

        describe("when an element name is specified as oneOrMore", () => {
            describe("when that child is not present", () => {
                it("should return an empty array", () => {
                    const actual = parser.children("Name", noChildrenNode, {
                        oneOrMore: {
                            Zero: true,
                        },
                    });
                    expect(actual.Zero).toEqual([]);
                });

                it("should add a warning message", () => {
                    parser.children("Name", noChildrenNode, {
                        oneOrMore: {
                            Zero: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        "Required child <Zero> missing from element <Name>",
                    ]);
                });
            });

            describe("when that child is present one time", () => {
                it("should return an array with the child", () => {
                    const actual = parser.children("Name", oneChildNode, {
                        oneOrMore: {
                            One: true,
                        },
                    });
                    expect(actual.One).toEqual([node1a]);
                });

                it("should not add a warning message", () => {
                    parser.children("Name", oneChildNode, {
                        oneOrMore: {
                            One: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });

            describe("when that child is present multiple times", () => {
                it("should return an array with the children", () => {
                    const actual = parser.children("Name", twoChildrenNode, {
                        oneOrMore: {
                            Two: true,
                        },
                    });
                    expect(actual.Two).toEqual([node2a, node2b]);
                });

                it("should not add a warning message", () => {
                    parser.children("Name", twoChildrenNode, {
                        oneOrMore: {
                            Two: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });
        });

        describe("when an element name is specified as zeroOrOne", () => {
            describe("when that child is not present", () => {
                it("should return undefined", () => {
                    const actual = parser.children("Name", noChildrenNode, {
                        zeroOrOne: {
                            Zero: true,
                        },
                    });
                    expect(actual.Zero).toBeUndefined();
                });

                it("should not add a warning message", () => {
                    parser.children("Name", noChildrenNode, {
                        zeroOrOne: {
                            Zero: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });

            describe("when that child is present one time", () => {
                it("should return the child", () => {
                    const actual = parser.children("Name", oneChildNode, {
                        zeroOrOne: {
                            One: true,
                        },
                    });
                    expect(actual.One).toEqual(node1a);
                });

                it("should not add a warning message", () => {
                    parser.children("Name", oneChildNode, {
                        zeroOrOne: {
                            One: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });

            describe("when that child is present multiple times", () => {
                it("should return the first child", () => {
                    const actual = parser.children("Name", twoChildrenNode, {
                        zeroOrOne: {
                            Two: true,
                        },
                    });
                    expect(actual.Two).toEqual(node2a);
                });

                it("should add a warning message", () => {
                    parser.children("Name", twoChildrenNode, {
                        zeroOrOne: {
                            Two: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        "Expected element <Name> to have 0 or 1 <Two> child element but had 2 children",
                    ]);
                });
            });
        });

        describe("when an element name is specified as exactlyOne", () => {
            describe("when that child is not present", () => {
                it("should return undefined", () => {
                    const actual = parser.children("Name", noChildrenNode, {
                        exactlyOne: {
                            Zero: true,
                        },
                    });
                    expect(actual.Zero).toBeUndefined();
                });

                it("should add a warning message", () => {
                    parser.children("Name", noChildrenNode, {
                        exactlyOne: {
                            Zero: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        "Required child <Zero> missing from element <Name>",
                    ]);
                });
            });

            describe("when that child is present one time", () => {
                it("should return the child", () => {
                    const actual = parser.children("Name", oneChildNode, {
                        exactlyOne: {
                            One: true,
                        },
                    });
                    expect(actual.One).toEqual(node1a);
                });

                it("should not add a warning message", () => {
                    parser.children("Name", oneChildNode, {
                        exactlyOne: {
                            One: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });

            describe("when that child is present multiple times", () => {
                it("should return the first child", () => {
                    const actual = parser.children("Name", twoChildrenNode, {
                        exactlyOne: {
                            Two: true,
                        },
                    });
                    expect(actual.Two).toEqual(node2a);
                });

                it("should add a warning message", () => {
                    parser.children("Name", twoChildrenNode, {
                        exactlyOne: {
                            Two: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        "Expected element <Name> to have 1 <Two> child element but had 2 children",
                    ]);
                });
            });
        });

        describe("when an element name is not specified", () => {
            it("should add a warning message for each element name that was present as a child but not specified", () => {
                parser.children("Name", childrenNode, {});
                expect(parser.warnings).toEqual([
                    "Child <One> not expected in element <Name>",
                    "Child <Two> not expected in element <Name>",
                ]);
            });
        });

        describe("when multiple element names are specified", () => {
            it("should aggregate the results", () => {
                const actual = parser.children("Name", childrenNode, {
                    zeroOrOne: {
                        One: true,
                    },
                    oneOrMore: {
                        Two: true,
                    },
                });
                expect(actual).toEqual({
                    One: node1a,
                    Two: [node2a, node2b],
                });
            });

            it("should add multiple warning messages", () => {
                parser.children("Name", childrenNode, {
                    exactlyOne: {
                        Two: true,
                    },
                    oneOrMore: {
                        Zero: true,
                    },
                });
                // 3 warnings:
                // - Zero missing when expected
                // - One present but not expected
                // - Two present more than once
                expect(parser.warnings.length).toBe(3);
            });
        });
    });

    describe("noAttributes", () => {
        describe("when the node has attributes", () => {
            it("should add a warning message for each attribute name present", () => {
                parser.noAttributes("Name", multipleAttributesNode);
                expect(parser.warnings.sort()).toEqual([
                    'Extra attribute "Attribute1" present in element <Name>',
                    'Extra attribute "Attribute2" present in element <Name>',
                    'Extra attribute "Attribute3" present in element <Name>',
                ]);
            });
        });

        describe("when the node does not have attributes", () => {
            it("should not add a warning message", () => {
                parser.noAttributes("Name", noAttributesNode);
                expect(parser.warnings.length).toBe(0);
            });
        });
    });

    describe("attributes", () => {
        describe("when an attribute name is specified as requiredText", () => {
            describe("when that attribute is present", () => {
                it("should return the attribute value", () => {
                    const actual = parser.attributes("Name", attributeNode, {
                        requiredText: {
                            Attribute1: true,
                        },
                    });
                    expect(actual.Attribute1).toBe("value1");
                });

                it("should normalize newlines", () => {
                    const actual = parser.attributes(
                        "Name",
                        attributeWithWindowsNewlineNode,
                        {
                            requiredText: {
                                Attribute1: true,
                            },
                        }
                    );
                    expect(actual.Attribute1).toBe("value\n\n1");
                });

                it("should not add a warning message", () => {
                    parser.attributes("Name", attributeNode, {
                        requiredText: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings.length).toBe(0);
                });
            });

            describe("when that attribute is not present", () => {
                it("should return an empty string", () => {
                    const actual = parser.attributes("Name", noAttributesNode, {
                        requiredText: {
                            Attribute10: true,
                        },
                    });
                    expect(actual.Attribute10).toBe("");
                });

                it("should add a warning message", () => {
                    parser.attributes("Name", noAttributesNode, {
                        requiredText: {
                            Attribute10: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        'Required attribute "Attribute10" missing from element <Name>',
                    ]);
                });
            });
        });

        describe("when an attribute name is specified as optionalText", () => {
            describe("when that attribute is present", () => {
                it("should return the attribute value", () => {
                    const actual = parser.attributes("Name", attributeNode, {
                        optionalText: {
                            Attribute1: true,
                        },
                    });
                    expect(actual.Attribute1).toBe("value1");
                });

                it("should normalize newlines", () => {
                    const actual = parser.attributes(
                        "Name",
                        attributeWithWindowsNewlineNode,
                        {
                            optionalText: {
                                Attribute1: true,
                            },
                        }
                    );
                    expect(actual.Attribute1).toBe("value\n\n1");
                });

                it("should not add a warning message", () => {
                    parser.attributes("Name", attributeNode, {
                        optionalText: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings.length).toBe(0);
                });
            });

            describe("when that attribute is not present", () => {
                it("should return undefined", () => {
                    const actual = parser.attributes("Name", noAttributesNode, {
                        optionalText: {
                            Attribute10: true,
                        },
                    });
                    expect(actual.Attribute10).toBeUndefined();
                });

                it("should not add a warning message", () => {
                    parser.attributes("Name", noAttributesNode, {
                        optionalText: {
                            Attribute10: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });
        });

        describe("when an attribute name is specified as requiredNumber", () => {
            describe("when that attribute is parsable as a number", () => {
                it("should return the attribute value", () => {
                    const actual = parser.attributes(
                        "Name",
                        numberAttributeNode,
                        {
                            requiredNumber: {
                                Attribute1: true,
                            },
                        }
                    );
                    expect(actual.Attribute1).toBe(1.23);
                });

                it("should not add a warning message", () => {
                    parser.attributes("Name", numberAttributeNode, {
                        requiredNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings.length).toBe(0);
                });
            });

            describe("when that attribute is not parsable as a number", () => {
                it("should return undefined", () => {
                    const actual = parser.attributes("Name", attributeNode, {
                        requiredNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(actual.Attribute1).toBeUndefined();
                });

                it("should add a warning message", () => {
                    parser.attributes("Name", attributeNode, {
                        requiredNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        'Expected attribute "Attribute1" in element <Name> to be a number',
                    ]);
                });
            });

            describe("when that attribute is an empty string", () => {
                it("should return undefined", () => {
                    const actual = parser.attributes(
                        "Name",
                        emptyStringAttributeNode,
                        {
                            requiredNumber: {
                                Attribute1: true,
                            },
                        }
                    );
                    expect(actual.Attribute1).toBeUndefined();
                });

                it("should add a warning message", () => {
                    parser.attributes("Name", emptyStringAttributeNode, {
                        requiredNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        'Expected attribute "Attribute1" in element <Name> to be a number',
                    ]);
                });
            });

            describe("when that attribute is not present", () => {
                it("should return undefined", () => {
                    const actual = parser.attributes("Name", noAttributesNode, {
                        requiredNumber: {
                            Attribute10: true,
                        },
                    });
                    expect(actual.Attribute10).toBeUndefined();
                });

                it("should add a warning message", () => {
                    parser.attributes("Name", noAttributesNode, {
                        requiredNumber: {
                            Attribute10: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        'Required attribute "Attribute10" missing from element <Name>',
                    ]);
                });
            });
        });

        describe("when an attribute name is specified as optionalNumber", () => {
            describe("when that attribute is parsable as a number", () => {
                it("should return the attribute value", () => {
                    const actual = parser.attributes(
                        "Name",
                        numberAttributeNode,
                        {
                            optionalNumber: {
                                Attribute1: true,
                            },
                        }
                    );
                    expect(actual.Attribute1).toBe(1.23);
                });

                it("should not add a warning message", () => {
                    parser.attributes("Name", numberAttributeNode, {
                        optionalNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings.length).toBe(0);
                });
            });

            describe("when that attribute is not parsable as a number", () => {
                it("should return undefined", () => {
                    const actual = parser.attributes("Name", attributeNode, {
                        optionalNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(actual.Attribute1).toBeUndefined();
                });

                it("should add a warning message", () => {
                    parser.attributes("Name", attributeNode, {
                        optionalNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings).toEqual([
                        'Expected attribute "Attribute1" in element <Name> to be a number',
                    ]);
                });
            });

            describe("when that attribute is an empty string", () => {
                it("should return undefined", () => {
                    const actual = parser.attributes(
                        "Name",
                        emptyStringAttributeNode,
                        {
                            optionalNumber: {
                                Attribute1: true,
                            },
                        }
                    );
                    expect(actual.Attribute1).toBeUndefined();
                });

                it("should not add a warning message", () => {
                    parser.attributes("Name", emptyStringAttributeNode, {
                        optionalNumber: {
                            Attribute1: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });

            describe("when that attribute is not present", () => {
                it("should return undefined", () => {
                    const actual = parser.attributes("Name", noAttributesNode, {
                        optionalNumber: {
                            Attribute10: true,
                        },
                    });
                    expect(actual.Attribute10).toBeUndefined();
                });

                it("should not add a warning message", () => {
                    parser.attributes("Name", noAttributesNode, {
                        optionalNumber: {
                            Attribute10: true,
                        },
                    });
                    expect(parser.warnings).toEqual([]);
                });
            });
        });

        describe("when an attribute name is not specified", () => {
            it("should add a warning message for each attribute that was present but not specified", () => {
                parser.attributes("Name", multipleAttributesNode, {
                    requiredText: {
                        Attribute2: true,
                    },
                });
                expect(parser.warnings.sort()).toEqual([
                    'Extra attribute "Attribute1" present in element <Name>',
                    'Extra attribute "Attribute3" present in element <Name>',
                ]);
            });
        });

        describe("when multiple attribute names are specified", () => {
            it("should aggregate the results", () => {
                const actual = parser.attributes(
                    "Name",
                    multipleAttributesNode,
                    {
                        requiredText: {
                            Attribute1: true,
                            Attribute10: true,
                        },
                        optionalText: {
                            Attribute2: true,
                            Attribute3: true,
                            Attribute11: true,
                        },
                    }
                );
                expect(actual).toEqual({
                    Attribute1: "value1",
                    Attribute2: "value2",
                    Attribute3: "value3",
                    Attribute10: "",
                    Attribute11: undefined,
                });
            });

            it("should add multiple warning messages", () => {
                parser.attributes("Name", multipleAttributesNode, {
                    requiredText: {
                        Attribute1: true,
                        Attribute10: true,
                    },
                    optionalText: {
                        Attribute2: true,
                        Attribute11: true,
                    },
                });
                // 2 warnings:
                // - Attribute3 present but not specified
                // - Attribute10 required but not present
                expect(parser.warnings.length).toBe(2);
            });
        });

        describe("when no attributes are present at all", () => {
            it("should return an empty object", () => {
                const actual = parser.attributes("Name", noAttributesNode, {});
                expect(actual).toEqual({});
            });

            it("should add warning mesages for specified required attributes", () => {
                parser.attributes("Name", noAttributesNode, {
                    requiredText: {
                        Attribute1: true,
                        Attribute2: true,
                    },
                    optionalText: {
                        Attribute3: true,
                    },
                });
                expect(parser.warnings.length).toBe(2);
            });
        });
    });
});

describe("ifPresent", () => {
    it("should return the value of the provided function called with the provided value", () => {
        const actual = ifPresent(123, x => [x * 2, x * 3]);
        expect(actual).toEqual([246, 369]);
    });

    it("should return an empty array when the provided value is undefined", () => {
        const actual = ifPresent(undefined, x => {
            throw new Error("This function should not be called.");
        });
        expect(actual).toEqual([]);
    });
});
