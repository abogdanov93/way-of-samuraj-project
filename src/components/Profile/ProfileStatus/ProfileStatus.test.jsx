import React from "react";
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {     // describe объединяет тесты
    test("Status from post should be in the state", () => {
        const component = create(<ProfileStatus status={"test"}/>); // create создает фейковую компоненту
        const instance = component.getInstance(); // instance получает объект, который создался на основе классовой компоненты
        expect(instance.state.status).toBe("test");
    });

    test("After creation div should be displayed", () => {
        const component = create(<ProfileStatus status={"test"}/>);
        const root = component.root;
        const div = root.findByType("div")
        expect(div).toBeTruthy();
    });

    test("After creation div value should be correct", () => {
        const component = create(<ProfileStatus status={"test"}/>);
        const root = component.root;
        const div = root.findByType("div")
        expect(div.children[0]).toBe("test");
    });

    test("After creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"test"}/>);
        const root = component.root;
        const input = root.findByType("input")
        expect(input).toBeNull();
    });
});