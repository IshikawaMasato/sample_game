// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }
    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('hanako', 'assets/hanako.png');
    }
    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'background');
        const player1 = this.physics.add.sprite(50, 50, 'taro');
        const player2 = this.physics.add.sprite(750, 400, 'hanako');    
        this.player1=player1;
        this.player2=player2;
    }
     // 毎フレーム実行される繰り返し処理
    update() {
        
    }
}