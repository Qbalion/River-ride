input.onButtonPressed(Button.A, function () {
    if (gun.get(LedSpriteProperty.X) > 0) {
        gun.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (gun.get(LedSpriteProperty.X) < 4) {
        gun.change(LedSpriteProperty.X, 1)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (shot == 0) {
        shot = 1
        missile = game.createSprite(gun.get(LedSpriteProperty.X), 3)
        missile.turn(Direction.Left, 90)
    }
})
let missile: game.LedSprite = null
let shot = 0
let gun: game.LedSprite = null
gun = game.createSprite(2, 4)
let attack = 1
let enemy = game.createSprite(Math.randomRange(0, 4), 0)
enemy.turn(Direction.Right, 90)
shot = 0
let pace = 1000
let level = 1
basic.forever(function () {
    basic.pause(pace)
    if (shot == 1) {
        if (missile.get(LedSpriteProperty.Y) == 0) {
            shot = 0
            missile.delete()
        } else {
            if (missile.isTouching(enemy)) {
                game.addScore(5)
                shot = 0
                missile.delete()
                attack = 0
                enemy.delete()
                basic.pause(200)
            }
            missile.move(1)
            if (missile.isTouching(enemy)) {
                game.addScore(5)
                shot = 0
                missile.delete()
                attack = 0
                enemy.delete()
                basic.pause(200)
            }
        }
    }
    if (attack == 1) {
        if (enemy.isTouching(gun)) {
            game.gameOver()
        } else {
            if (enemy.get(LedSpriteProperty.Y) == 4) {
                game.addScore(1)
                basic.pause(200)
                enemy.delete()
                attack = 0
            }
            enemy.move(1)
        }
    } else {
        attack = 1
        enemy = game.createSprite(Math.randomRange(0, 4), 0)
        enemy.turn(Direction.Right, 90)
        if (pace > 150) {
            pace += -50
            level += 1
            basic.showNumber(level)
        }
    }
})
