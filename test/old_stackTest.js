// import {expect} from "chai";
// import {createStack, push, pop} from "../z_old/stack";
//
// describe("Stack", function(){
//     it("should return 0 size", function(){
//         expect(createStack().size).to.equal(0);
//     });
//
//     it("should have size 1 after pushing", function() {
//         expect(push(createStack(), 1).size).to.equal(1);
//     });
//
//     it("should have size 0 after popping", function(){
//         expect(pop(push(createStack(), 1))[0].size).to.equal(0);
//     });
//
//     it("should throw an error when trying to pop when empty", function(){
//         expect(() => pop(createStack())).to.throw(Error, "Can't pop when empty.");
//     });
//
//
//     it("should throw an error when trying to push when at capacity", function(){
//         expect(() => push(push(createStack(1), 'c'), 'd')).to.throw(Error, "Can't push when at capacity.");
//     });
//
//     /**
//      * This tests for the reversed-order feature of a stack pop
//      */
//     it("should return values in reverse order", function () {
//
//         var firstPop = pop(push(push(createStack(), 'a'), 'b'));
//         var secondPop = pop(firstPop[0]);
//
//         expect(secondPop[1]).to.equal('a');
//         expect(firstPop[1]).to.equal('b');
//
//     });
//
// });
