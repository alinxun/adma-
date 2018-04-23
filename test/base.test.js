const Base = require('../src/base');

describe("query", () => {
    test("Normal", () => {
        expect(Base.query("name", "?name=xiaomi")).toBe("xiaomi");
        expect(Base.query("name", "?name=xiaomi&name2=mitu")).toBe("xiaomi");
        expect(Base.query("name", "?name2=apple&name=huawei")).toBe("huawei");
        expect(Base.query("name", "?a&name=lenovo")).toBe("lenovo");
        expect(Base.query("name", "?name=dell&")).toBe("dell");
    });
    test("Abnormal", () => {
        expect(Base.query("name", "?name=")).toBe("");
        expect(Base.query("name", "=")).toBeUndefined();
        expect(Base.query("name", "?name1=content")).toBeUndefined();
        expect(Base.query("name", "?1name=content")).toBeUndefined();
    });
});

describe("serialize", () => {
    test("Normal", () => {
        expect(Base.serialize({ name: "xiaomi" })).toBe("name=xiaomi");
        expect(Base.serialize({ name: "zimi", name2: "dami" })).toBe("name=zimi&name2=dami");
        expect(Base.serialize({ num: 1 })).toBe("num=1");
    });
    test("Abnormal", () => {
        expect(Base.serialize({})).toBe("");
        expect(Base.serialize(null)).toBe("");
        expect(Base.serialize([1, 2, 3])).toBe("0=1&1=2&2=3");
    });
});

describe("removeItemByIndex", () => {
    test("Normal", () => {
        expect(Base.removeItemByIndex(0, [1, 2, 3])).not.toContain(1);
        expect(Base.removeItemByIndex(0, [1, 2, 3])).toEqual([2,3]);
        expect(Base.removeItemByIndex(1, [1, 2, 3])).not.toContain(2);
        expect(Base.removeItemByIndex(2, [1, 2, 3])).not.toContain(3);
    });
    test("Removing out of range object", () => {
        expect(Base.removeItemByIndex(3, [1, 2, 3])).toEqual([1, 2, 3]);
    });
});



describe("debounce", () => {
    test("Execution", done => {
        const expected = 123;
        const time = 500;
        const debounced = Base.debounce(argv => {
            expect(argv).toEqual(expected);
            expect(Math.round(performance.now() - start)).toBeGreaterThanOrEqual(time);
            done();
        }, time);
        const start = performance.now();
        debounced(expected);
    });
    test("Without execution", () => {
        let execution = 0;
        const debounced = Base.debounce(() => {
            execution++;
        });
        debounced();
        expect(execution).toBe(0);
    });
    test("With multiple executions", done => {
        let execution = 0;
        const debounced = Base.debounce(() => {
            execution++;
        });
        for (let i = 0; i < 10; i++)
            debounced();
        setTimeout(() => {
            expect(execution).toBe(1);
            done();
        }, 300);
    });
});

describe("selector", () => {
    document.body.innerHTML = "<div id='test'>example</div>";
    test("Node exists", () => {
        expect(Base.$("#test").id).toBe("test");
        expect(Base.$("#test").innerHTML).toBe("example");
    });
    test("Node does not exist", () => {
        expect(Base.$("#nothing")).toBeNull();
    });
});

describe("removeNode", () => {
    test("Remove child from parent", () => {
        const p = document.createElement("div");
        const c = document.createElement("div");
        p.appendChild(c);
        expect(p.childNodes[0]).toBe(c);
        expect(p.childElementCount).toBe(1);
        Base.removeNode(c);
        expect(p.childElementCount).toBe(0);
    });
});

describe("insertAfter", () => {
    test("Inserting a node in the middle", () => {
        const p = document.createElement("div");
        const c1 = document.createElement('div');
        const c2 = document.createElement('div');
        const c3 = document.createElement('div');
        
        p.appendChild(c1);
        p.appendChild(c3);
        Base.insertAfter(c2, c1);
        expect(p.childElementCount).toBe(3);
        expect(c1.nextSibling).toBe(c2);
        expect(c2.nextSibling).toBe(c3);
    });
    test("Inserting a node in the end", () => {
        const p = document.createElement("div");
        const c1 = document.createElement('div');
        const c2 = document.createElement('div');
        const c3 = document.createElement('div');
        p.appendChild(c1);
        Base.insertAfter(c2, c1);
        expect(p.childElementCount).toBe(2);
        expect(c1.nextSibling).toBe(c2);
        Base.insertAfter(c3, c2);
        expect(p.childElementCount).toBe(3);
        expect(c2.nextSibling).toBe(c3);
    });
});

describe("addClass", () => {
    test("Add a class to the element's classList", () => {
        const d = document.createElement("div");
        Base.addClass(d, "c1");
        expect(d.classList).toContain("c1");
    });
    test("Add a class to the element's classList", () => {
        const d = document.createElement("div");
        Base.addClass(d, ["c1"]);
        expect(d.classList).toContain("c1");
    });
    test("Add some classes to the element's classList", () => {
        const d = document.createElement("div");
        Base.addClass(d, ["c1", "c2"]);
        for (let className of ["c1", "c2"]) {
            expect(d.classList).toContain(className);
        }
    });
});

describe("removeClass", () => {
    test("Remove a class from the element's classList", () => {
        const node = document.createElement("div");
        node.classList.add("c");
        Base.removeClass(node, "c");
        expect(node.classList).not.toContain("c");
    });
    test("Remove some classes from the element's classList", () => {
        const node = document.createElement("div");
        node.classList.add("c1");
        node.classList.add("c2");
        Base.removeClass(node, ["c1", "c2"]);
        for (let className of ["c1", "c2"]) {
            expect(node.classList).not.toContain(className);
        }
    });
});

describe("getAbsoluteUrl", () => {
    const base = document.createElement("base");
    base.href = "https://www.baidu.com/";
    document.head.appendChild(base);
    test("Generate an absolute URL to /news", () => {
        expect(Base.getAbsoluteUrl("/news")).toBe("https://www.baidu.com/news");
        document.head.removeChild(base);
    });
});
