export function cameraControls(game:Phaser.Game, cursors:Phaser.CursorKeys, menuGroup:Phaser.Group){
  const cameramaxX = game.world.width - game.width;
  const cameramaxY = game.world.height - game.height;
  if (cursors.up.isDown) {
    game.camera.y -= 4;
    menuGroup.y -= 4;
    if (menuGroup.y < 0) {
      game.camera.y = 0;
      menuGroup.y = 0;
    }
  } else if (cursors.down.isDown) {
    game.camera.y += 4;
    menuGroup.y += 4;
    if (menuGroup.y > cameramaxY) {
      game.camera.y = cameramaxY;
      menuGroup.y = cameramaxY;
    }
  }

  if (cursors.left.isDown) {
    game.camera.x -= 4;
    menuGroup.x -= 4;
    if (menuGroup.x < 0) {
      game.camera.x = 0;
      menuGroup.x = 0;
    }

  } else if (cursors.right.isDown) {
    game.camera.x += 4;
    menuGroup.x += 4;
    if (menuGroup.x > cameramaxX) {
      game.camera.x = cameramaxX;
      menuGroup.x = cameramaxX;
    }
  }
}
