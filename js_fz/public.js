jQuery(".slideBox").slide({
    mainCell: ".bd ul",
    autoPlay: true,
    effect: "leftLoop",
  });
  jQuery(".picMarquee-left").slide({
    mainCell: ".bd ul", autoPlay: true,
    effect: "leftMarquee", vis: 5, interTime: 50
  });