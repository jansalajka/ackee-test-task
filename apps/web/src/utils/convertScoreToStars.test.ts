import { describe, expect, it } from 'vitest';

import { convertScoreToStars } from './convertScoreToStars';

describe('convertScoreToStars', () => {
    describe('with default totalStars (5)', () => {
        it('should return 0 for score 0', () => {
            expect(convertScoreToStars(0)).toBe(0);
        });

        it('should return 5 for score 100', () => {
            expect(convertScoreToStars(100)).toBe(5);
        });

        it('should return 0 for negative score', () => {
            expect(convertScoreToStars(-10)).toBe(0);
        });

        it('should return 5 for score greater than 100', () => {
            expect(convertScoreToStars(150)).toBe(5);
        });

        it('should return 1 for score 20', () => {
            expect(convertScoreToStars(20)).toBe(1);
        });

        it('should return 2 for score 40', () => {
            expect(convertScoreToStars(40)).toBe(2);
        });

        it('should return 3 for score 60', () => {
            expect(convertScoreToStars(60)).toBe(3);
        });

        it('should return 4 for score 80', () => {
            expect(convertScoreToStars(80)).toBe(4);
        });

        it('should round up correctly', () => {
            expect(convertScoreToStars(15)).toBe(1);
        });

        it('should round down correctly', () => {
            expect(convertScoreToStars(14)).toBe(1);
        });

        it('should handle decimal scores', () => {
            expect(convertScoreToStars(50.5)).toBe(3);
        });
    });

    describe('with custom totalStars', () => {
        it('should return 0 for score 0 with custom totalStars', () => {
            expect(convertScoreToStars(0, 10)).toBe(0);
        });

        it('should return totalStars for score 100 with custom totalStars', () => {
            expect(convertScoreToStars(100, 10)).toBe(10);
        });

        it('should return half of totalStars for score 50', () => {
            expect(convertScoreToStars(50, 10)).toBe(5);
        });

        it('should clamp to totalStars for score greater than 100', () => {
            expect(convertScoreToStars(150, 10)).toBe(10);
        });

        it('should clamp to 0 for negative score', () => {
            expect(convertScoreToStars(-10, 10)).toBe(0);
        });

        it('should work with totalStars of 1', () => {
            expect(convertScoreToStars(50, 1)).toBe(1);
            expect(convertScoreToStars(0, 1)).toBe(0);
        });

        it('should work with large totalStars', () => {
            expect(convertScoreToStars(50, 100)).toBe(50);
            expect(convertScoreToStars(25, 100)).toBe(25);
        });
    });
});
