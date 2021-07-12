import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';

class ClientGame {
  constructor(config) {
    Object.assign(this, { config });

    this.engine = this.createEngine();

    this.world = this.createWorld();

    this.initEngine();
    console.log(this);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.config.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', (_, timestamp) => {
        this.world.init();
      });
      this.engine.start();
    });
  }

  static init(config) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(config);
      console.log('Game initialized');
    }
  }
}

export default ClientGame;
