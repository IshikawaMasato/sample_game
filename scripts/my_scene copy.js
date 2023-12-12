
// MyScene1クラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MyScene extends Phaser.Scene {
    // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
    constructor() {
        super({ key: 'MyScene', active: true });
    }

    // シーンの事前読み込み処理
    preload() {
         // 画像の読み込み(使用する時の名前, パス)
        this.load.image('background', 'assets/background.png');
        this.load.image('taro', 'assets/taro.png');
        this.load.image('jori', 'assets/jori.png');
        this.load.image('hanako', 'assets/hanako.png');
    }

    // シーン初期化処理
    create() {
         // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(D_WIDTH/2, D_HEIGHT/2, 'background');        
        // this.player1 =this.physics.add.sprite(500, 350, 'taro');
        // this.player2 =this.add.image(200, 350, 'jori');
        // this.player3 =this.add.image(100, 100, 'hanako');
        // this.player1.angle=0;
        // this.player1_direction = 1;
        
        //時間のセット
        this._leftTime=3;
        this._timeCounter=0;

        //当たり判定
        this.physics.world.setBounds(0, 0, D_WIDTH, D_HEIGHT);
        this.player1 = this.physics.add.sprite(500, 350, 'taro');
        this.player3 = this.physics.add.sprite(100, 100, 'hanako');
        this.physics.add.collider(this.player1, this.player3, this.handleCollision, null, this);

        //文字の追加
        this.add.text(600,400, 'MyWorld', { fontSize: '32px', fill: '#FFF' });
        this.text =this.add.text(100, 50, "", {fontSize: '32px', fill: '#ffffff'});
        
        ///WASDキーを検知できるようにする
        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
  // 毎フレーム実行される繰り返し処理
    update(time,delta) {
        // if (this.player1.x >= D_WIDTH - 100) this.player1_direction = -1;
        // if (this.player1.x <= 100) this.player1_direction = 1;
    
        // if (this.player1_direction == 1) {
        //     this.player1.x += 5;// 横方向へ移動を設定
        //     this.player1.y += 5;// 横方向へ移動を設定
        // }else {
        //     this.player1.x -= 5;// 横方向へ移動を設定
        //     this.player1.y -= 5;// 横方向へ移動を設定
        // }
        // this.player1.angle += 5;

        // let cursors = this.input.keyboard.createCursorKeys();
        // if (cursors.left.isDown) {
        //     //console.log("Left!");
        //     this.player1.x -= 50;// 左方向に移動
        //     this.player2.x += 50;// 左方向に移動

        // } else if (cursors.right.isDown) {
        //     //console.log("Right!");
        //     this.player1.x += 50;// 右方向に移動
        //     this.player2.x -= 50;// 右方向に移動
        // }
        this.wasd_move(this.keys)

        //カウントダウン
        this._timeCounter += delta;
        if(this._timeCounter > 3000) {
            this._timeCounter = 0;
            this.randPosition();
        }

        //方向キーでの移動
        if (this.cursors.left.isDown) {
            this.player1.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player1.setVelocityX(200);
        } else {
            this.player1.setVelocityX(0);
        }
        if (this.cursors.up.isDown) {
            this.player1.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.player1.setVelocityY(200);
        }else {
            this.player1.setVelocityY(0);
        }
    }
    //WASDの処理
    wasd_move(keys){
        if(keys.keyS.isDown){  //Sが押されている時
            this.text.text ="Hey!";
        }else if(keys.keyA.isDown){  //Aが押されている時
            this.text.text ="Hello!";
        }else if(keys.keyD.isDown){ //Dが押されている時
            this.text.destroy();
        }
        // else if(keys.keyW.isDown){ //Wが押されている時
        //     this.player3.x=Phaser.Math.Between(100, 400);
        // }
    }
    //花子のランダムな移動
    randPosition() {
        const x = Phaser.Math.Between(200, 400);
        const y = Phaser.Math.Between(100, 200);
        this.player3.setPosition(x, y);
    }
    //ぶつかった時の処理
    handleCollision() {
        // ぶつかったときの処理
        this.text.setText("痛い！");
        this.text.setPosition(100, 150);
        this.player3.disableBody(true, true);
    }
}