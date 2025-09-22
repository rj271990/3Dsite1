// ----- stable-locomotive + ScrollTrigger integration (copy-paste this whole file) -----
(function () {
  gsap.registerPlugin(ScrollTrigger);

  const mainScroller = document.querySelector("#main");
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  // mobile detection (tweak breakpoint if you want)
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;

  let locoScroll = null;

  function safeScrollTo(value) {
    if (!locoScroll) {
      // fallback to native
      if (mainScroller) mainScroller.scrollTop = value;
      else window.scrollTo(0, value);
      return;
    }
    // try common loco signatures safely
    try {
      // older signature: locoScroll.scrollTo(value, 0, 0)
      locoScroll.scrollTo(value, 0, 0);
      return;
    } catch (e) {}
    try {
      // newer signature: locoScroll.scrollTo(target, options)
      locoScroll.scrollTo(value, { offset: 0, duration: 0 });
      return;
    } catch (e) {}
    // last resort
    if (mainScroller) mainScroller.scrollTop = value;
    else window.scrollTo(0, value);
  }

  function safeGetLocoY() {
    if (!locoScroll) return (mainScroller && mainScroller.scrollTop) || window.pageYOffset || 0;

    // try multiple internals used across versions
    try {
      if (locoScroll.scroll && locoScroll.scroll.instance && locoScroll.scroll.instance.scroll && typeof locoScroll.scroll.instance.scroll.y === "number") {
        return locoScroll.scroll.instance.scroll.y;
      }
    } catch (e) {}
    try {
      if (typeof locoScroll.scrollY === "number") return locoScroll.scrollY;
    } catch (e) {}
    try {
      if (locoScroll.scroll && typeof locoScroll.scroll.y === "number") return locoScroll.scroll.y;
    } catch (e) {}
    // final fallback to container scrollTop
    return (mainScroller && mainScroller.scrollTop) || window.pageYOffset || 0;
  }

  function initLocomotive() {
    if (!mainScroller) {
      console.warn("No #main element found. Scroll features will fallback to native.");
      attachScrollProxy();
      return;
    }

    if (typeof LocomotiveScroll !== "undefined") {
      try {
        locoScroll = new LocomotiveScroll({
          el: mainScroller,
          smooth: !isMobile,
          // ensure mobile/tablet internal flags are set to avoid unwanted smooth behavior
          smartphone: { smooth: false },
          tablet: { smooth: false },
        });

        locoScroll.on("scroll", ScrollTrigger.update);
      } catch (err) {
        console.warn("LocomotiveScroll init failed, falling back to native scroll.", err);
        locoScroll = null;
      }
    } else {
      locoScroll = null;
    }

    attachScrollProxy();
  }

  function attachScrollProxy() {
    // scrollerProxy must be present even when locoScroll is null (we provide safe fallbacks)
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        if (arguments.length) {
          // setter
          safeScrollTo(value);
        } else {
          // getter
          return safeGetLocoY();
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // if loco is active and not mobile-smooth-fallback, use transform pinning, otherwise use fixed
      pinType: locoScroll && !isMobile ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => {
      if (locoScroll && typeof locoScroll.update === "function") {
        locoScroll.update();
      }
    });

    // After everything loads, make sure sizes / states are correct
    window.addEventListener("load", () => {
      if (locoScroll && typeof locoScroll.update === "function") locoScroll.update();
      ScrollTrigger.refresh();
    });
  }

  initLocomotive();

  // Responsive refresh
  window.addEventListener("resize", () => {
    // optional: if you want to re-detect isMobile on resize/orientation change, you can reload or re-init
    // We'll just refresh here
    if (locoScroll && typeof locoScroll.update === "function") locoScroll.update();
    ScrollTrigger.refresh();
    // update canvas size too
    updateCanvasSize();
    render();
  });

  // Canvas setup & image sequence logic (kept similar to your original but safer)
  function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  updateCanvasSize();

  // your original file list (unchanged)
  function files(index) {
    var data = `
     ./male0001.png
     ./male0002.png
     ./male0003.png
     ./male0004.png
     ./male0005.png
     ./male0006.png
     ./male0007.png
     ./male0008.png
     ./male0009.png
     ./male0010.png
     ./male0011.png
     ./male0012.png
     ./male0013.png
     ./male0014.png
     ./male0015.png
     ./male0016.png
     ./male0017.png
     ./male0018.png
     ./male0019.png
     ./male0020.png
     ./male0021.png
     ./male0022.png
     ./male0023.png
     ./male0024.png
     ./male0025.png
     ./male0026.png
     ./male0027.png
     ./male0028.png
     ./male0029.png
     ./male0030.png
     ./male0031.png
     ./male0032.png
     ./male0033.png
     ./male0034.png
     ./male0035.png
     ./male0036.png
     ./male0037.png
     ./male0038.png
     ./male0039.png
     ./male0040.png
     ./male0041.png
     ./male0042.png
     ./male0043.png
     ./male0044.png
     ./male0045.png
     ./male0046.png
     ./male0047.png
     ./male0048.png
     ./male0049.png
     ./male0050.png
     ./male0051.png
     ./male0052.png
     ./male0053.png
     ./male0054.png
     ./male0055.png
     ./male0056.png
     ./male0057.png
     ./male0058.png
     ./male0059.png
     ./male0060.png
     ./male0061.png
     ./male0062.png
     ./male0063.png
     ./male0064.png
     ./male0065.png
     ./male0066.png
     ./male0067.png
     ./male0068.png
     ./male0069.png
     ./male0070.png
     ./male0071.png
     ./male0072.png
     ./male0073.png
     ./male0074.png
     ./male0075.png
     ./male0076.png
     ./male0077.png
     ./male0078.png
     ./male0079.png
     ./male0080.png
     ./male0081.png
     ./male0082.png
     ./male0083.png
     ./male0084.png
     ./male0085.png
     ./male0086.png
     ./male0087.png
     ./male0088.png
     ./male0089.png
     ./male0090.png
     ./male0091.png
     ./male0092.png
     ./male0093.png
     ./male0094.png
     ./male0095.png
     ./male0096.png
     ./male0097.png
     ./male0098.png
     ./male0099.png
     ./male0100.png
     ./male0101.png
     ./male0102.png
     ./male0103.png
     ./male0104.png
     ./male0105.png
     ./male0106.png
     ./male0107.png
     ./male0108.png
     ./male0109.png
     ./male0110.png
     ./male0111.png
     ./male0112.png
     ./male0113.png
     ./male0114.png
     ./male0115.png
     ./male0116.png
     ./male0117.png
     ./male0118.png
     ./male0119.png
     ./male0120.png
     ./male0121.png
     ./male0122.png
     ./male0123.png
     ./male0124.png
     ./male0125.png
     ./male0126.png
     ./male0127.png
     ./male0128.png
     ./male0129.png
     ./male0130.png
     ./male0131.png
     ./male0132.png
     ./male0133.png
     ./male0134.png
     ./male0135.png
     ./male0136.png
     ./male0137.png
     ./male0138.png
     ./male0139.png
     ./male0140.png
     ./male0141.png
     ./male0142.png
     ./male0143.png
     ./male0144.png
     ./male0145.png
     ./male0146.png
     ./male0147.png
     ./male0148.png
     ./male0149.png
     ./male0150.png
     ./male0151.png
     ./male0152.png
     ./male0153.png
     ./male0154.png
     ./male0155.png
     ./male0156.png
     ./male0157.png
     ./male0158.png
     ./male0159.png
     ./male0160.png
     ./male0161.png
     ./male0162.png
     ./male0163.png
     ./male0164.png
     ./male0165.png
     ./male0166.png
     ./male0167.png
     ./male0168.png
     ./male0169.png
     ./male0170.png
     ./male0171.png
     ./male0172.png
     ./male0173.png
     ./male0174.png
     ./male0175.png
     ./male0176.png
     ./male0177.png
     ./male0178.png
     ./male0179.png
     ./male0180.png
     ./male0181.png
     ./male0182.png
     ./male0183.png
     ./male0184.png
     ./male0185.png
     ./male0186.png
     ./male0187.png
     ./male0188.png
     ./male0189.png
     ./male0190.png
     ./male0191.png
     ./male0192.png
     ./male0193.png
     ./male0194.png
     ./male0195.png
     ./male0196.png
     ./male0197.png
     ./male0198.png
     ./male0199.png
     ./male0200.png
     ./male0201.png
     ./male0202.png
     ./male0203.png
     ./male0204.png
     ./male0205.png
     ./male0206.png
     ./male0207.png
     ./male0208.png
     ./male0209.png
     ./male0210.png
     ./male0211.png
     ./male0212.png
     ./male0213.png
     ./male0214.png
     ./male0215.png
     ./male0216.png
     ./male0217.png
     ./male0218.png
     ./male0219.png
     ./male0220.png
     ./male0221.png
     ./male0222.png
     ./male0223.png
     ./male0224.png
     ./male0225.png
     ./male0226.png
     ./male0227.png
     ./male0228.png
     ./male0229.png
     ./male0230.png
     ./male0231.png
     ./male0232.png
     ./male0233.png
     ./male0234.png
     ./male0235.png
     ./male0236.png
     ./male0237.png
     ./male0238.png
     ./male0239.png
     ./male0240.png
     ./male0241.png
     ./male0242.png
     ./male0243.png
     ./male0244.png
     ./male0245.png
     ./male0246.png
     ./male0247.png
     ./male0248.png
     ./male0249.png
     ./male0250.png
     ./male0251.png
     ./male0252.png
     ./male0253.png
     ./male0254.png
     ./male0255.png
     ./male0256.png
     ./male0257.png
     ./male0258.png
     ./male0259.png
     ./male0260.png
     ./male0261.png
     ./male0262.png
     ./male0263.png
     ./male0264.png
     ./male0265.png
     ./male0266.png
     ./male0267.png
     ./male0268.png
     ./male0269.png
     ./male0270.png
     ./male0271.png
     ./male0272.png
     ./male0273.png
     ./male0274.png
     ./male0275.png
     ./male0276.png
     ./male0277.png
     ./male0278.png
     ./male0279.png
     ./male0280.png
     ./male0281.png
     ./male0282.png
     ./male0283.png
     ./male0284.png
     ./male0285.png
     ./male0286.png
     ./male0287.png
     ./male0288.png
     ./male0289.png
     ./male0290.png
     ./male0291.png
     ./male0292.png
     ./male0293.png
     ./male0294.png
     ./male0295.png
     ./male0296.png
     ./male0297.png
     ./male0298.png
     ./male0299.png
     ./male0300.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 300;
  const images = [];
  const imageSeq = { frame: 1 };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  // safer render() - only draws when image is loaded; tries to fallback to last loaded image if needed
  function render() {
    let img = images[imageSeq.frame];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // try to find nearest loaded image (backwards)
      for (let j = imageSeq.frame; j >= 0; j--) {
        const alt = images[j];
        if (alt && alt.complete && alt.naturalWidth > 0) {
          img = alt;
          break;
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) {
        // nothing available yet
        return;
      }
    }
    scaleImage(img, context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  // GSAP animation - scroller is #main (works with loco or native)
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.15,
      trigger: "#page>canvas",
      start: "top top",
      end: isMobile ? "400% top" : "600% top", // shorter on mobile to avoid extreme pin ranges
      scroller: "#main",
    },
    onUpdate: render,
  });

  // ensure first available image draws when it's ready
  (function attachFirstLoads() {
    for (let i = 0; i < Math.min(5, images.length); i++) {
      images[i].addEventListener("load", function () {
        if (imageSeq.frame === 1) render();
      });
    }
  })();

  // initial onload draw
  images[1] && images[1].addEventListener("load", render);

  // pin the canvas section (pinType chosen by scrollerProxy earlier)
  ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: isMobile ? "600% top" : "900% top",
  });
})();
