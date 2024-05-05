class Play extends Phaser.Scene {
  constructor() {
    super("Play");
    this.movies = [
      // Based on mood (きぶんはどうですか?)
      {
        title: "Star Wars",
        tags: ["うれしい", "アクション", "はれ"],
      },
      { title: "Singin' in the Rain", tags: ["かなしい", "ロマンス", "あめ"] },
      {
        title: "Interstellar",
        tags: ["たのしい", "ファンタジー", "くもり"],
      },
      { title: "A Quiet Place", tags: ["こわい", "ホラー", "ゆき"] },

      // Based on company (えいがを見る時、だれと見たいですか？)
      { title: "Cast Away", tags: ["一人で", "つまらない"] },
      { title: "Elf", tags: ["ともだちと", "コメディ", "楽しい"] },
      {
        title: "The Incredibles ",
        tags: ["かぞくと", "ファンタジー", "まあまあ"],
      },
      {
        title: "Rome + Juliet",
        tags: ["こいびとと", "ロマンス", "いそがしい"],
      },

      // Based on today's weather and work/school situation (今日のてんきは？, しごとや学校はどうですか？)
      { title: "Top Gun", tags: ["はれ", "いそがしい", "アクション"] },
      {
        title: "Minions",
        tags: ["くもり", "まあまあ", "コメディ"],
      },
    ];

    this.questionTextObjects = []; // To keep track of question and choice text objects for removal

    this.answers = []; // To store player's answers
  }

  preload() {
    // will this work?? lol
    const isGitHubPages = window.location.href.includes("github.io");
    const basePath = isGitHubPages ? "/Surfy-Game/" : "./";
    // preload da assetssss
    this.load.atlas(
      "surfy",
      basePath + "assets/spritesheets/surfy.png",
      basePath + "assets/spritesheets/surfy.json"
    );
    this.load.image("button", basePath + "assets/button.png");
    this.load.image("chatbubble", basePath + "assets/chatbubble.png");
    this.load.image("beachBackground", basePath + "assets/beach.png");
  }

  create() {
    let bg = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "beachBackground"
    );

    bg.setDisplaySize(this.cameras.main.width, 500);

    // Create sprite
    // image0 will be the default
    this.surfySprite = this.add.sprite(400, 380, "surfy", "image0.png");

    // Define anims
    this.anims.create({
      key: "idle",
      frames: [
        { key: "surfy", frame: "image1.png" },
        { key: "surfy", frame: "image2.png" },
        { key: "surfy", frame: "image3.png" },
        { key: "surfy", frame: "image4.png" },
        { key: "surfy", frame: "image5.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // Play anim
    this.surfySprite.anims.play("idle");

    this.surfySprite.setScale(2);

    // Start the questionnaire
    this.displayQuestion(0);
  }

  displayQuestion(questionIndex) {
    // Clear previous question and choices
    if (this.chatBubble) {
      this.chatBubble.destroy();
      this.chatBubbleText.destroy();
    }
    this.questionTextObjects.forEach((obj) => obj.destroy());
    this.questionTextObjects = [];

    const questions = [
      {
        text: "きぶんはどうですか?",
        choices: ["うれしい", "かなしい", "たのしい", "こわい"],
      },
      {
        text: "どんなえいががすきですか？",
        choices: ["アクション", "ロマンス", "コメディ", "ファンタジー"],
      },
      {
        text: "今日のてんきは？",
        choices: ["はれ", "くもり", "あめ", "ゆき"],
      },
      {
        text: "えいがを見る時、だれと見たいですか？ ",
        choices: ["一人で", "ともだちと", "かぞくと", "こいびとと"],
      },
      {
        text: "大学はどうですか?",
        choices: ["いそがしい", "楽しい", "つまらない", "まあまあ"],
      },
    ];

    if (questionIndex < questions.length) {
      let question = questions[questionIndex];

      // Use the createChatBubble to display the question text
      this.createChatBubble(200, 100, question.text);

      question.choices.forEach((choice, index) => {
        // Adjust answer button position here
        let buttonY = 300 + 50 * index;
        let button = this.add
          .sprite(100, buttonY, "button")
          .setInteractive()
          .setScale(0.25)
          .setOrigin(0, 0.5);

        // Adjust text position relative to your button
        let choiceText = this.add.text(120, buttonY - 10, choice, {
          fontSize: "20px",
          color: "#000",
        });

        this.questionTextObjects.push(button, choiceText);

        button.on("pointerdown", () => {
          this.answers.push(choice);
          if (questionIndex + 1 < questions.length) {
            this.displayQuestion(questionIndex + 1);
          } else {
            this.recommendMovie();
          }
        });
      });
    } else {
      this.recommendMovie();
    }
  }

  recommendMovie() {
    let recommendedMovie = null;
    let highestScore = 0;

    this.movies.forEach((movie) => {
      let score = movie.tags.filter((tag) => this.answers.includes(tag)).length;
      if (score > highestScore) {
        highestScore = score;
        recommendedMovie = movie;
      }
    });

    if (recommendedMovie) {
      this.surfySprite.anims.stop();
      this.surfySprite.setTexture("surfy", "image6.png");

      this.createChatBubble(
        200,
        100,
        `おすすめの映画は: ${recommendedMovie.title}`
      );
    }
  }

  createChatBubble(x, y, text) {
    // Clear previous chat bubble and text
    if (this.chatBubble) {
      this.chatBubble.destroy();
      this.chatBubbleText.destroy();
    }

    // Create chat bubble image as background
    this.chatBubble = this.add.image(x, y, "chatbubble").setOrigin(0, 0);

    const newBubbleWidth = 400;
    const newBubbleHeight = 150;
    this.chatBubble.setDisplaySize(newBubbleWidth, newBubbleHeight);

    // Bubble Size
    const textPadding = 20;
    const availableTextWidth = newBubbleWidth - textPadding * 2;

    this.chatBubbleText = this.add.text(
      x + textPadding,
      y + textPadding,
      text,
      {
        fontSize: "18px",
        color: "#000000",
        wordWrap: { width: availableTextWidth },
        align: "center",
      }
    );

    // Text alignment
    this.chatBubbleText.setX(
      x + (newBubbleWidth - this.chatBubbleText.width) / 2
    );
    this.chatBubbleText.setY(
      y + (newBubbleHeight - this.chatBubbleText.height) / 2 - textPadding / 2
    );
  }
}
