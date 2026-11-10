import { l as createVNode, J as Fragment, _ as __astro_tag_component__ } from './astro/server-33mZK7WG.js';
import { $ as $$CodeTabs } from './CodeTabs-CspYf7-C.js';
import 'clsx';

const frontmatter = {
  "title": "Building an Agentic RAG Workflow",
  "description": "A conceptual walkthrough of retrieval, orchestration, and grounded generation.",
  "pubDate": "2026-10-18T00:00:00.000Z",
  "tags": ["AI", "RAG", "LangChain", "Architecture"],
  "category": "AI Engineering",
  "draft": false,
  "readingTime": "10 min read"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "architecture-overview",
    "text": "Architecture overview"
  }, {
    "depth": 2,
    "slug": "a-small-retrieval-first-example",
    "text": "A small retrieval-first example"
  }, {
    "depth": 2,
    "slug": "engineering-considerations",
    "text": "Engineering considerations"
  }, {
    "depth": 3,
    "slug": "retrieval-quality",
    "text": "Retrieval quality"
  }, {
    "depth": 3,
    "slug": "permissions-and-data-boundaries",
    "text": "Permissions and data boundaries"
  }, {
    "depth": 3,
    "slug": "observability-and-evaluation",
    "text": "Observability and evaluation"
  }, {
    "depth": 2,
    "slug": "key-takeaway",
    "text": "Key takeaway"
  }];
}
function _createMdxContent(props) {
  const _components = {
    button: "button",
    code: "code",
    div: "div",
    figcaption: "figcaption",
    figure: "figure",
    h2: "h2",
    h3: "h3",
    link: "link",
    p: "p",
    pre: "pre",
    script: "script",
    span: "span",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Retrieval-augmented generation (RAG) combines a language model with relevant external information. An agentic workflow can add controlled decisions about which retrieval or application tools to use."
    }), "\n", createVNode(_components.h2, {
      id: "architecture-overview",
      children: "Architecture overview"
    }), "\n", createVNode(_components.div, {
      class: "expressive-code",
      children: [createVNode(_components.link, {
        rel: "stylesheet",
        href: "/assets/ec.y0rd3.css"
      }), createVNode(_components.script, {
        type: "module",
        src: "/assets/ec.0vx5m.js"
      }), createVNode(_components.figure, {
        class: "frame",
        children: [createVNode(_components.figcaption, {
          class: "header"
        }), createVNode(_components.pre, {
          "data-language": "mermaid",
          children: createVNode(_components.code, {
            children: [createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "flowchart TD"
                })
              })
            }), createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: [createVNode(_components.span, {
                  class: "indent",
                  children: createVNode(_components.span, {
                    style: {
                      "--0": "#E1E4E8",
                      "--1": "#24292E"
                    },
                    children: "    "
                  })
                }), createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "Q[User question] --> O[Orchestrator]"
                })]
              })
            }), createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: [createVNode(_components.span, {
                  class: "indent",
                  children: createVNode(_components.span, {
                    style: {
                      "--0": "#E1E4E8",
                      "--1": "#24292E"
                    },
                    children: "    "
                  })
                }), createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "O --> R[Retriever]"
                })]
              })
            }), createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: [createVNode(_components.span, {
                  class: "indent",
                  children: createVNode(_components.span, {
                    style: {
                      "--0": "#E1E4E8",
                      "--1": "#24292E"
                    },
                    children: "    "
                  })
                }), createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "O --> T[Approved tools]"
                })]
              })
            }), createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: [createVNode(_components.span, {
                  class: "indent",
                  children: createVNode(_components.span, {
                    style: {
                      "--0": "#E1E4E8",
                      "--1": "#24292E"
                    },
                    children: "    "
                  })
                }), createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "R --> C[Context assembly]"
                })]
              })
            }), createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: [createVNode(_components.span, {
                  class: "indent",
                  children: createVNode(_components.span, {
                    style: {
                      "--0": "#E1E4E8",
                      "--1": "#24292E"
                    },
                    children: "    "
                  })
                }), createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "T --> C"
                })]
              })
            }), createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: [createVNode(_components.span, {
                  class: "indent",
                  children: createVNode(_components.span, {
                    style: {
                      "--0": "#E1E4E8",
                      "--1": "#24292E"
                    },
                    children: "    "
                  })
                }), createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "C --> L[Language model]"
                })]
              })
            }), createVNode(_components.div, {
              class: "ec-line",
              children: createVNode(_components.div, {
                class: "code",
                children: [createVNode(_components.span, {
                  class: "indent",
                  children: createVNode(_components.span, {
                    style: {
                      "--0": "#E1E4E8",
                      "--1": "#24292E"
                    },
                    children: "    "
                  })
                }), createVNode(_components.span, {
                  style: {
                    "--0": "#E1E4E8",
                    "--1": "#24292E"
                  },
                  children: "L --> V[Validation and response]"
                })]
              })
            })]
          })
        }), createVNode(_components.div, {
          class: "copy",
          children: [createVNode(_components.div, {
            "aria-live": "polite"
          }), createVNode(_components.button, {
            title: "Copy to clipboard",
            "data-copied": "Copied!",
            "data-code": "flowchart TD    Q[User question] --> O[Orchestrator]    O --> R[Retriever]    O --> T[Approved tools]    R --> C[Context assembly]    T --> C    C --> L[Language model]    L --> V[Validation and response]",
            children: createVNode(_components.div, {})
          })]
        })]
      })]
    }), "\n", createVNode(_components.p, {
      children: "The diagram is conceptual. A production workflow may require authorization filters, retries, timeouts, tracing, evaluation, and human approval for sensitive actions."
    }), "\n", createVNode(_components.h2, {
      id: "a-small-retrieval-first-example",
      children: "A small retrieval-first example"
    }), "\n", "\n", createVNode($$CodeTabs, {
      examples: [{
        label: 'Python',
        language: 'python',
        code: 'def answer(query, retriever, llm):\n    documents = retriever.search(query)\n    context = format_context(documents)\n    return llm.generate(query=query, context=context)'
      }, {
        label: 'TypeScript',
        language: 'ts',
        code: 'async function answer(query, retriever, llm) {\n  const documents = await retriever.search(query);\n  const context = formatContext(documents);\n  return llm.generate({ query, context });\n}'
      }, {
        label: 'Java',
        language: 'java',
        code: 'Answer answer(String query) {\n    var documents = retriever.search(query);\n    var context = formatContext(documents);\n    return llm.generate(query, context);\n}'
      }]
    }), "\n", createVNode(_components.p, {
      children: "These snippets illustrate the same general flow. The interfaces are placeholders, so adapt them to the framework and APIs in your application."
    }), "\n", createVNode(_components.h2, {
      id: "engineering-considerations",
      children: "Engineering considerations"
    }), "\n", createVNode(_components.h3, {
      id: "retrieval-quality",
      children: "Retrieval quality"
    }), "\n", createVNode(_components.p, {
      children: "Measure whether relevant documents are retrieved, not just whether the generated answer sounds plausible."
    }), "\n", createVNode(_components.h3, {
      id: "permissions-and-data-boundaries",
      children: "Permissions and data boundaries"
    }), "\n", createVNode(_components.p, {
      children: "Apply access control during retrieval. Do not rely on the model to decide whether a user may see a document."
    }), "\n", createVNode(_components.h3, {
      id: "observability-and-evaluation",
      children: "Observability and evaluation"
    }), "\n", createVNode(_components.p, {
      children: "Capture retrieval outcomes, latency, token usage, tool calls, and quality metrics. Build representative evaluation sets before changing prompts or models."
    }), "\n", createVNode(_components.h2, {
      id: "key-takeaway",
      children: "Key takeaway"
    }), "\n", createVNode(_components.p, {
      children: "An agentic RAG system should make tool use observable and constrained. Add autonomy only where it provides a measurable benefit over a simpler retrieval pipeline."
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/agentic-rag-workflow.mdx";
const file = "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/content/blog/agentic-rag-workflow.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/sambasiva.reddy/Downloads/yourname-astro-portfolio/src/content/blog/agentic-rag-workflow.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
