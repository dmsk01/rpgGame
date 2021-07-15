import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(config) {
    Object.assign(this, { config, gameObjects, player: null });

    this.engine = this.createEngine();

    this.map = this.createWorld();

    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.config.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, timestamp) => {
        this.map.render(timestamp);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(-1, 0, (cell) => {
            return cell.findObjectsByType('grass').length;
          });
        }
      },
      ArrowRight: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(+1, 0, (cell) => {
            return cell.findObjectsByType('grass').length;
          });
        }
      },
      ArrowUp: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(0, -1, (cell) => {
            return cell.findObjectsByType('grass').length;
          });
        }
      },
      ArrowDown: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(0, +1, (cell) => {
            return cell.findObjectsByType('grass').length;
          });
        }
      },
    });
  }

  static init(config) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(config);
    }
  }
}

export default ClientGame;
