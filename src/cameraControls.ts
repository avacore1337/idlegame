export function cameraControls(game:Phaser.Game, cursors:Phaser.CursorKeys){

  if (cursors.up.isDown) {
    game.camera.y -= 4;
  } else if (cursors.down.isDown) {
    game.camera.y += 4;
  } else if (cursors.left.isDown) {
    game.camera.x -= 4;
  } else if (cursors.right.isDown) {
    game.camera.x += 4;
  }

}
