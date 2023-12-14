/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "adb5de1d19e563d8e167c0b1e2cc3695"
  },
  {
    "url": "assets/css/0.styles.d6e4dc84.css",
    "revision": "a10f848b5199d9bb7850ca1afd36cfa2"
  },
  {
    "url": "assets/img/business_actors.541b7f52.jpg",
    "revision": "541b7f521c8d5af28423294fb1c7a3eb"
  },
  {
    "url": "assets/img/ckan.78bddb68.png",
    "revision": "78bddb68dcd27ea45b695b00956a6434"
  },
  {
    "url": "assets/img/cloude.b48a1c44.jpg",
    "revision": "b48a1c443f1f03e26e278576b8bd44ca"
  },
  {
    "url": "assets/img/crowdsourcing.abc54512.jpg",
    "revision": "abc545121419715bb1bf3e4b2de91384"
  },
  {
    "url": "assets/img/data_gov.0a1216bd.png",
    "revision": "0a1216bda60133bf7e84f798dddfbf87"
  },
  {
    "url": "assets/img/database.aba810cd.jpg",
    "revision": "aba810cd53c228329a5c00e6ee060b99"
  },
  {
    "url": "assets/img/delete.beb7723e.png",
    "revision": "beb7723e9b8cd3144bd41fefd584f45b"
  },
  {
    "url": "assets/img/ERR_Diagram.eaa9b24b.png",
    "revision": "eaa9b24b80e9a9dcd975e15d9cc23b6c"
  },
  {
    "url": "assets/img/get_after.7fb2caf7.png",
    "revision": "7fb2caf7604218199739f73389f2b763"
  },
  {
    "url": "assets/img/get_all.149dba93.png",
    "revision": "149dba93c5239ac83f3567150faa7719"
  },
  {
    "url": "assets/img/get_by_id.c92324a3.png",
    "revision": "c92324a38482022d7aaf23d0a3faea58"
  },
  {
    "url": "assets/img/machine_learning.31b771f2.jpg",
    "revision": "31b771f2debbfff781cf573473788a37"
  },
  {
    "url": "assets/img/modify_uncreated.c0728fc0.png",
    "revision": "c0728fc029996b5d7be3faff2519cfd5"
  },
  {
    "url": "assets/img/modify.06b14c2a.png",
    "revision": "06b14c2a640baa7bbc78887f09d0c019"
  },
  {
    "url": "assets/img/opendatasoft.bbab4790.png",
    "revision": "bbab4790100e26097cadd67de1ddbeee"
  },
  {
    "url": "assets/img/post_extend.67477b4b.png",
    "revision": "67477b4b9f7cbc3929f512f5f656a01e"
  },
  {
    "url": "assets/img/post.048c3f51.png",
    "revision": "048c3f51de40e98655e399a7c9933f33"
  },
  {
    "url": "assets/img/rbac.0a226d39.jpg",
    "revision": "0a226d39b61a5e540e6d408b2e656997"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/socrata.34930cdd.png",
    "revision": "34930cddd7c17fd3ccfce8e0a08e4cb2"
  },
  {
    "url": "assets/img/webscrapping.688f5706.jpg",
    "revision": "688f570695020ea6ee0d402bd5542cbf"
  },
  {
    "url": "assets/js/10.0a6f5535.js",
    "revision": "a5c17fb155ee773debe12bd9512d1d09"
  },
  {
    "url": "assets/js/11.20338cb5.js",
    "revision": "baa0dc0aa1abe8c581c2f0aa5a486214"
  },
  {
    "url": "assets/js/12.ccec7ef5.js",
    "revision": "e51c3fc89153497483369a7af030cfa9"
  },
  {
    "url": "assets/js/13.ab4398d8.js",
    "revision": "5c2cbeaae292778dd3d240a0f7bbed60"
  },
  {
    "url": "assets/js/14.62ecbc6c.js",
    "revision": "84dcef93ab6d3d05fae5d9cbfb63ed57"
  },
  {
    "url": "assets/js/15.dc6e7c71.js",
    "revision": "25a8c65003c472cc6543863a7459a5c6"
  },
  {
    "url": "assets/js/16.084eaeeb.js",
    "revision": "2b5221c3f928957efad739c5e8cd1ef6"
  },
  {
    "url": "assets/js/17.bcf3b516.js",
    "revision": "ab7f0e2f87dac1a6e519e4712e21e4ff"
  },
  {
    "url": "assets/js/18.503d1fef.js",
    "revision": "ccda11d68554c75b5034d36752c1bfcf"
  },
  {
    "url": "assets/js/19.088dc4f6.js",
    "revision": "66367df285928e5b3e78e62aa1e710ff"
  },
  {
    "url": "assets/js/2.6e43d83c.js",
    "revision": "5be7010b636361b23a8c2170f15ceff8"
  },
  {
    "url": "assets/js/20.ffda38f1.js",
    "revision": "ec4447452951fe5448eb79d521f9c7f7"
  },
  {
    "url": "assets/js/21.79ba8d85.js",
    "revision": "67c3be6619e43cf12c85cd3455da265b"
  },
  {
    "url": "assets/js/22.c48e1e72.js",
    "revision": "47ad4efec1635a9ca981bae8485f048b"
  },
  {
    "url": "assets/js/23.92f772d0.js",
    "revision": "c5abe79d21270af70b2c73ecae88d23b"
  },
  {
    "url": "assets/js/24.d1838a47.js",
    "revision": "24ec21d73be27e05a77f4a20d998b3ca"
  },
  {
    "url": "assets/js/26.71d31e44.js",
    "revision": "fda07e2c68b30a011ac8494d09641c86"
  },
  {
    "url": "assets/js/3.59bfac36.js",
    "revision": "dcabde8ae002afd25dc3cff1fd3a4888"
  },
  {
    "url": "assets/js/4.e239ad12.js",
    "revision": "a309d77995e5bf75698ab66f866c35e9"
  },
  {
    "url": "assets/js/5.3689cde2.js",
    "revision": "685c7cdb18daebfa7c7ca7e50c1acdf1"
  },
  {
    "url": "assets/js/6.9dc38897.js",
    "revision": "3da92ede6c54aa4c95e389e69f1a5a21"
  },
  {
    "url": "assets/js/7.134c848e.js",
    "revision": "7afd43161088f5d5463e2f1e31f1ecf2"
  },
  {
    "url": "assets/js/8.1a6c4b3b.js",
    "revision": "2bf358461d0be513276937ad1b168990"
  },
  {
    "url": "assets/js/9.f76e2e0e.js",
    "revision": "6f7d3cb2fe8a6cc41b0ba965e550c3ee"
  },
  {
    "url": "assets/js/app.fc694d4b.js",
    "revision": "1e3cb4d7b46434f7b2f784a0718463eb"
  },
  {
    "url": "conclusion/index.html",
    "revision": "80a08d8237cd08dd6992f80192662a7a"
  },
  {
    "url": "design/index.html",
    "revision": "4c33a2cff61828fb01d9170dded32192"
  },
  {
    "url": "index.html",
    "revision": "9e8233a2e7f9e364aa25d58b6ae82f73"
  },
  {
    "url": "intro/index.html",
    "revision": "edab95c2dfd95f442e94835fed5e70db"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "b2cb014f660c7ff384cdfc65950dd57a"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "98aab6c0205a15c6380fe763bc5a1248"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "6d3a420cca33d2e786298b2cc328feb0"
  },
  {
    "url": "software/index.html",
    "revision": "ba71063a1971836593646cf38d34fc9a"
  },
  {
    "url": "test/index.html",
    "revision": "cf033b522f4a78681a00eaf79e3679cf"
  },
  {
    "url": "use cases/index.html",
    "revision": "5ca4082c85c2c4f61bde5cfce4ae7392"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
