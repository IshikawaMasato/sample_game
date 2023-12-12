
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
        this.load.image('jiro', 'assets/taro.png');
        this.load.image('hanako','assets/hanako.png')
    }

    // シーン初期化処理
    create() {
        // 単体画像をシーンに追加(X座標,Y座標,画像名)
        this.add.image(400, 300, 'background');
        // const player1 = this.add.image(400, 300, 'taro');
        // this.player1 = player1;

        // this.hanako = this.add.image(200,100,'hanako');
        // this.player2 = this.add.image(400, 400, 'jiro');
        // this.player_direction1 = 1;
        // this.player1.angle = 0;
        
        // this.text = this.add.text(10, 10, 'Scene 1').setFontSize(32).setColor('#ff0');
        // this.text = this.add.text(600,400 , 'MyWorld');

        this.text1 = this.add.text(100,50 , 'Hello!');
        this.text2 = this.add.text(100,50 , 'Hey!');

        this.text1.setVisible(false);
        this.text2.setVisible(false);

        //  const hanako = this.add.image(100,100,'hanako'); 
        //  this.hanako = hanako;

        this.physics.world.setBounds(0, 0, D_WIDTH, D_HEIGHT);
        const player1 = this.add.sprite(400, 300, 'taro');
        this.player1 = player1;
        const hanako = this.add.sprite(200,100,'hanako');
        this.hanako = hanako;
        this.physics.add.collider(this.player1,this.hanako, this.handleCollision, null, this);


        this._timeCounter = 0;  //msの経過時間を保存するカウンター 
        this._leftTime = 3;   //残り時間
        this._leftTimeText = this.add.text(1, 1, 'Time: ' + this._leftTime, { fontSize: '1px', fill: '#FFF' ,fontFamily: "Arial"}); //時間表示
        this.countdowntimer = true;


        this.physics.add.collider(this.player1, this.hanako, this.handleCollision, null, this);
        // let staticGroup = this.physics.add.staticGroup();
        // let group = this.physics.add.group();


        // this.physics.add.overlap(player1,this.hanako, hitHanako, null, this);
        // function hitHanako(p,hanako){
        //     console.log('痛い');
        //     this.text3 = this.add.text(100,150,'痛い!',{ fontSize: '32px', fill: '#FFF' });                                                                                                                                                                                                                           
        //     hanako.destoroy();
        // }

        this.keys = {};
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    arrow_move(cursors, object){
        if(cursors.left.isDown){
            console.log("Left");
            this.player1.x -= 10;
            // this.player2.x += 10;
            // object.setVelocityX(-10);
        }else if(cursors.right.isDown){
            console.log("Right!!");
            this.player1.x += 10;
            // this.player2.x -= 10;
            // object.setVelocityX(10);
        }else if(cursors.up.isDown) {
            //console.log("Up!");
            this.player1.y -= 10;// 上方向に移動    
            // object.setVelocityY(-10);
        } else if(cursors.down.isDown) {
            //console.log("Down!");    
            this.player1.y += 10;// 下方向に移動
            // object.setVelocityY(10);
        }
    }

    wasd_move(keys){
        if(keys.keyA.isDown){
            console.log("A");
            this.text1.setVisible(true);
        } else if(keys.keyS.isDown){
            console.log("S");
            this.text2.setVisible(true);
        } else if(keys.keyD.isDown) {
            console.log("D");
            this.text1.setVisible(false);
            this.text2.setVisible(false);
        }
        // if(keys.keyW.isDown){
        //     console.log("W");
        //     if(this.hanako.x <= 400){
        //         this.hanako.x += 1;
        //     }
        //     // this.text1.setVisible(true);
        // }
    }
    handleCollision() {
        // ぶつかったときの処理
        this.text.setText("痛い！");
        this.text.setPosition(100, 150);
        this.player3.disableBody(false, true);
    }

  // 毎フレーム実行される繰り返し処理
    update(time,delta) {
        // this.player1.angle += 50;
        // // if(this.player1.y >= D_HEIGHT - 100) this.player_direction1 = -1;
        // if(this.player1.y <= 100) this.player_direction1 = 1;
        // if(this.player_direction1 == 1) {
        //     this.player1.y -= 5
        // }

        // if(this.player1x <= 100) this.player_direction1 = 1;
        // if(this.player_direction1 == 1) {
        //     this.player1.x += 5;
        // }
        let cursors = this.input.keyboard.createCursorKeys();

        this.arrow_move(cursors,this.player1)
        // this.wasd_move(this.keys, this.text1);
        // this.wasd_move(this.keys, this.text2);
        // this.wasd_move(this.keys, this.text3);
        this.wasd_move(this.keys,this.hanako);

        this._timeCounter += delta;

        if(this._timeCounter > 1000) {
            // 1000ミリ秒経過したのでカウンターをリセット
            this._timeCounter = 0;
            // 残り時間を減らす
            this._leftTime --;
            // テキストを更新する
            this._leftTimeText.setText('Time: ' + this._leftTime);
        }
        if(this._leftTime <= 0) {
            this._leftTime = 10000000000000;
            this.hanako.setPosition(Phaser.Math.Between(200,400),Phaser.Math.Between(100,200));
        }
    }
}