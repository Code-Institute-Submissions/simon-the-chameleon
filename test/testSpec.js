describe("Step", function() {
    describe("Previous Steps", function() {
        it("Should take a step number and return the previous step number", function() {
            for (i = 5; i >= 1; i--) {
                expect(checkStepNumber(i, "Previous")).toBe(i-1);
            }
        });

        it("Should loop back to end if current step number is zero", function() {
            expect(checkStepNumber(0, "Previous")).toBe(5);
        });
    });

    describe("Next Steps", function() {
        it("Should take a step number and return the next step number", function() {
            for (i = 0; i <= 4; i++) {
                expect(checkStepNumber(i, "Next")).toBe(i+1);
            }
        });

        it("Should loop back to beginning if current step number is five", function() {
            expect(checkStepNumber(5, "Next")).toBe(0);
        });
    });
});