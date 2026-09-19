/**
 * Fun mini-games for micro:bit
 */
//% block="Mini-games" icon="\uf11b" color=#6f00ff weight=0
namespace minigames {
    
    function showHand(hand: number): void {
        if (hand === 0) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
            `);
        } else if (hand === 1) {
            basic.showLeds(`
                . # # # .
                . # # # .
                . # # # .
                . # # # .
                . # # # .
            `);
        } else {
            basic.showIcon(IconNames.Scissors);
        }
    }

    /**
     * Runs a rock paper scissors game
     */
    //% block="play rock paper scissors" weight=0
    export function rockPaperScissors(forever: boolean = true): void {
        let players: number = 0;
        let opponents: number;
        let turn: boolean = true;
        let wins: number = 0;
        let draws: number = 0;
        let losses: number = 0;
        input.onButtonPressed(Button.A, (): void => {
            if (turn) {
                music.play(music.tonePlayable(494, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground);
                players = (players + 1) % 3;
            }
        });
        input.onButtonPressed(Button.B, (): void => {
            if (turn) {
                music.play(music.stringPlayable("E B C5 A B G A F ", 300), music.PlaybackMode.UntilDone);
                turn = false;
            }
        });
        basic.forever((): void => {
            if (wins + losses + draws >= 5) {
                basic.showString("GAME OVER!", 80);
                basic.pause(200);
                if (wins > losses) {
                    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground);
                    basic.showString("YOU WIN!", 80);
                } else if (wins < losses) {
                    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone);
                    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone);
                    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground);
                    basic.showString("YOU LOSE!", 80);
                } else {
                    music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground);
                    basic.showString("DRAW!", 80);
                }
                basic.pause(700);
                basic.showString(`${wins} vs. ${losses}`, 80);
                if (!forever) {
                    return;
                }
                wins = 0;
                losses = 0;
                draws = 0;
                turn = true;
            }
            if (turn) {
                showHand(players);
            } else {
                opponents = randint(0, 2);
                showHand(opponents);
                basic.pause(400);
                if (players === opponents) {
                    music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground);
                    basic.showIcon(IconNames.Asleep);
                    draws++;
                } else if ((players + 2) % 3 === opponents) {
                    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground);
                    basic.showIcon(IconNames.Happy);
                    wins++;
                } else {
                    basic.showIcon(IconNames.Sad);
                    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone);
                    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone);
                    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground);
                    losses++;
                }
                basic.pause(700);
                turn = true;
            }
        });
    }

    export function memory(forever: boolean = false): void {
        let turn: boolean = false;
        const inputted: string[] = [];
        const original: string[] = [];
        input.onButtonPressed(Button.A, (): void => {
            if (turn) {
                inputted.push("A");
            }
        });
        input.onButtonPressed(Button.A, (): void => {
            if (turn) {
                inputted.push("B");
            }
        });
        input.onButtonPressed(Button.AB, (): void => {
            if (turn) {
                inputted.push("+");
            }
        });
        input.onPinPressed(TouchPin.P0, (): void => {
            if (turn) {
                inputted.push("0");
            }
        });
        input.onPinPressed(TouchPin.P1, (): void => {
            if (turn) {
                inputted.push("1");
            }
        });
        input.onPinPressed(TouchPin.P2, (): void => {
            if (turn) {
                inputted.push("2");
            }
        });
        input.onLogoEvent(TouchButtonEvent.Pressed, (): void => {
            if (turn) {
                inputted.push("L");
            }
        });
        basic.forever((): void => {
            original.push(["A", "B", "+", "0", "1", "2", "L"][randint(0, 6)]);
            for (const input of original) {
                basic.showString(input);
                basic.pause(500);
            }
            return;
        });
    }
}
