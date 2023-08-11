## 1.0.1 (2021-03-10)

* chore(release): bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/982f4521bf273f42182627ea065bf7d90c511a18)
* Revert "chore(release): bump version number" [view](https://bitbucket.org/fynloh/hatschi/commits/d2063cc67e96d7d01b0fd68d58dcaed07739a0e5)
* chore(version): update version and changelog after confusion with npm version and release branch [view](https://bitbucket.org/fynloh/hatschi/commits/0a248a240bca9565cd82deaf8b36d51a445cb186)
* test(utils): insert mocks and stubs for easier testing [view](https://bitbucket.org/fynloh/hatschi/commits/7c5cc4ab75b660b38bf5ad9d8062dd302c41c065)
* refactor(firebase): move all firebase related code into a service [view](https://bitbucket.org/fynloh/hatschi/commits/98495d9aa2f0683985f5546f30ba92990e86b61e)
* test(firebase): update tests to use firebase stub instead of prod environment [view](https://bitbucket.org/fynloh/hatschi/commits/0d465bfdbfd7ee7b90f8aaec8a5b847e0c9ebeac)
* test(chat messages): insert test cases for lifecycle hooks and template behaviour [view](https://bitbucket.org/fynloh/hatschi/commits/4d9f81c5e7038d68ea91ec579792afba967dcf70)
* refactor(firebase stub): rename firebase service stub to match name convention [view](https://bitbucket.org/fynloh/hatschi/commits/4bcabcd13955cab0d93f4927ee852419b4513996)
* refactor(chat service): rename methode to match camelcase convention [view](https://bitbucket.org/fynloh/hatschi/commits/79306a72133228f4e12c66ab3df0984be3200e6d)
* test(chat service): insert unit tests and more firebase related stubs [view](https://bitbucket.org/fynloh/hatschi/commits/c8d42dd90ceade8adea57c8cfd9f290f7b490348)
* test(chat list): fix test setup and update firebase service stub [view](https://bitbucket.org/fynloh/hatschi/commits/fbee1ced0087604b758e0fa5b3f2721f5f14281e)
* feat(firebase): insert hosting information to deploy via cli [view](https://bitbucket.org/fynloh/hatschi/commits/29b7760aa08aa989d3d335f0e34bb7227ab99ac8)
* fix(browser): remove aot and optimizing from prod build [view](https://bitbucket.org/fynloh/hatschi/commits/edc421919845d3e863cf44e1803f6cae7eede5e6)
* fix(browser): adjust message input width to fit container [view](https://bitbucket.org/fynloh/hatschi/commits/f10655ef45244c22681698e981255bc54c5da37f)
* test(chat list): insert unit tests for functions, event triggers and template [view](https://bitbucket.org/fynloh/hatschi/commits/ec800d7962b5d5db96d8518679d365ea79323bf2)
* chore(release): bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/abf874747ff69c7bf65159c9d53752e63a5ee33a)


## v1.0.0 (2021-03-08)

* fix(chat): increase timeout to wait for dom changes [view](https://bitbucket.org/fynloh/hatschi/commits/a88e40d8b914f251a80c0144980261d8a256bbdb)
* fix(cordova-android): update to cordova-android@9 to fix outdated version bugs [view](https://bitbucket.org/fynloh/hatschi/commits/03a8ea5ab75257a9cdaa60e3f78c80deba4f4d99)
* test(loading service): check if spinner starts and can be dismissed [view](https://bitbucket.org/fynloh/hatschi/commits/f270574064aba62dd0dca557c0ac73e541c44a8d)
* test(iframe service): insert test cases for both methods [view](https://bitbucket.org/fynloh/hatschi/commits/71dfd67be8e725ef347a85759840f40d9c15c1a0)
* test(crypt service): insert test cases for every method [view](https://bitbucket.org/fynloh/hatschi/commits/f54f0c0c178f37a3b0288473507d64d4b9c1ab05)
* test(notification service): insert test cases for the mobile version [view](https://bitbucket.org/fynloh/hatschi/commits/6bedc7260135f7abe3c04334d7a8959033e79d31)
* test(storage service): insert test cases to check setting and getting data and init process [view](https://bitbucket.org/fynloh/hatschi/commits/d7bac813c7f3d1fd273956c2fde1ef409f50c8aa)
* refactor(storage): rename secureStorage to storage [view](https://bitbucket.org/fynloh/hatschi/commits/8bb7ec138834c576e97c50c0f80b9546f8a79f35)
* refactor(storage): move everything related to the storage into the dedicated service [view](https://bitbucket.org/fynloh/hatschi/commits/767af99e61763cfffdc995beff610102ec0dad15)
* test(storage service): insert test for getUsername() [view](https://bitbucket.org/fynloh/hatschi/commits/6607527ce0382315afe0a18d7ba8f146d1c7eac2)
* feat(theme): adjust colors, turn dark mode always on, adjust resources [view](https://bitbucket.org/fynloh/hatschi/commits/8897aec94a96394a07a2fad2ef370c1fd1b95b6b)
* 1.0.0 [view](https://bitbucket.org/fynloh/hatschi/commits/d01684c8f7174918de40bc77d6a627d0a100d31b)


## 0.9.1 (2021-03-05)

* chore(changelog): update changelog [view](https://bitbucket.org/fynloh/hatschi/commits/50fc17bcb7c1042721d53a0d0d956ada6bbba22a)
* test(storage): import storage into test suites [view](https://bitbucket.org/fynloh/hatschi/commits/0965358022ec879fa9e494d7e62eb3c17b4b4fae)
* perf(chat list): load all users and their names at the same time [view](https://bitbucket.org/fynloh/hatschi/commits/196e4d8e5daa654042af3214271b26eeeb7691de)
* refactor(app): restructure template conditions [view](https://bitbucket.org/fynloh/hatschi/commits/a136763e98c0b5066ab3ff1efdb6ac46945d2542)
* fix(browser): trigger change detection manually after hatschi identity is available [view](https://bitbucket.org/fynloh/hatschi/commits/fb35468d0d8c05d41e50176c9eb5f85547a49905)
* feat(loading state): insert service to activate loading spinner [view](https://bitbucket.org/fynloh/hatschi/commits/c2d37246571c74fa1b40e85c89e21719e523c8b2)
* fix(browser): perform object cloning outside of angular change tree [view](https://bitbucket.org/fynloh/hatschi/commits/df845ecdfef71e05431abe0574b0aa0aea84893f)
* chore(release): bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/ee23151d45f0817bf4a7913ba39a9af40367bf26)


## 0.9.0 (2021-03-04)

* feat(changelog): insert changelog script and generate changelog [view](https://bitbucket.org/fynloh/hatschi/commits/6e880be79b546d6c28460923a9eee9e2ea5fbbf0)
* chore(deps): install patches [view](https://bitbucket.org/fynloh/hatschi/commits/d391caa9228f0832f7a52b9badd04f505a2b3444)
* refactor(e2e test): exclude e2e app test from eslint [view](https://bitbucket.org/fynloh/hatschi/commits/e1c28e31bcd4f98d39a98fe3140b13d12e4d0ae1)
* refactor(eslint): allow 'any' in firebase cloud functions parameters [view](https://bitbucket.org/fynloh/hatschi/commits/c96f38b87056adaaa8f39998ebec7cd9dc229823)
* refactor(secure storage service): remove unused imports [view](https://bitbucket.org/fynloh/hatschi/commits/248c693bba0c1d7f911081ea3d07585427ca9557)
* chore(git): remove firebase emulator data folder [view](https://bitbucket.org/fynloh/hatschi/commits/23efa0cf4524cc21e43ace41bd749d6b51a83c66)
* feat(readme): update instructions and prerequisites [view](https://bitbucket.org/fynloh/hatschi/commits/6dc9e2e6ea20de4f851b242d7bcf98c22e107c7b)
* feat(notifications): insert and register service worker [view](https://bitbucket.org/fynloh/hatschi/commits/e0762f8d182eb7c7a6cb0835136252cd84e6524a)
* feat(notifications): implement differnt set up process for web and cordova [view](https://bitbucket.org/fynloh/hatschi/commits/f41fc157e7a8996889dfd6c0f311e3aee0f621c9)
* feat(notifications): insert approach to send notification to multiple devices [view](https://bitbucket.org/fynloh/hatschi/commits/eaa069bbfbf24521de694ea4d73852fd759bde6f)
* fix(notifications): register service worker only on desktop devices [view](https://bitbucket.org/fynloh/hatschi/commits/79370cc55f3ce281ac6482eb992e4a7510eca507)
* refactor(storage): remove public key from storage [view](https://bitbucket.org/fynloh/hatschi/commits/8ac9d2f139b1a8974769734e171724a4208e9062)
* feat(notifications): update database cloud listener function to support multi devices [view](https://bitbucket.org/fynloh/hatschi/commits/9b0fc088b5a52304fda191946ec89beccb7a61ad)
* feat(notifications): insert ability of web notifications [view](https://bitbucket.org/fynloh/hatschi/commits/13304afc732de606faba94e05b5763cc05a3aef0)
* chore(release): bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/a990b3ce4871f039bdebe23cb1cf0befc166052c)


## 0.8.4 (2021-03-04)

* feat(notifications): insert firebase cloud messaging for cordova [view](https://bitbucket.org/fynloh/hatschi/commits/94bd39f3b9bfd578cc979280122ac883478bce1b)
* refactor(dev mode): remove auth domain in firebase init [view](https://bitbucket.org/fynloh/hatschi/commits/aa6260b20052d2f755fa86d95201202dd36520ce)
* test(notification service): fix test set up of service and related app component [view](https://bitbucket.org/fynloh/hatschi/commits/5b3f501ac944c6bd71f24680a5584f6b1cbf0328)
* chore(release): bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/490d711d9e18547153e3f9dd60bec5c1d8988baa)


## 0.8.3 (2021-03-03)

* feat(database): update realtime database security rules [view](https://bitbucket.org/fynloh/hatschi/commits/7f2a2a246ce71196dd8dc51c393367ce9a23ab75)
* feat(cordova): update cordova dependencies [view](https://bitbucket.org/fynloh/hatschi/commits/334f2eaf8a44f9a9e6bc3a788457f212976fb657)
* chore(release): bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/bb63ccf55044920936152eea289f050ac16456da)


## 0.8.2 (2021-03-03)

* perf(user list): insert approach of more performant user mapping [view](https://bitbucket.org/fynloh/hatschi/commits/3a4e57cb384b0bea6997f9b2aca4f8e2d6df9732)
* chore(stylelint): insert stylelint, pre-commit hook and adjust scss files [view](https://bitbucket.org/fynloh/hatschi/commits/0325598c40df88a04a37fa9958d953556062784e)
* fix(scripts): rename npm script reference [view](https://bitbucket.org/fynloh/hatschi/commits/49adbcd40ecfc1429ee102978dedcc7aa37eb98f)
* test(new chat input): insert unit tests [view](https://bitbucket.org/fynloh/hatschi/commits/d0e526a9c1bceaa748e772805b0ea3f382803f08)
* wip(testing): adjust jest testing [view](https://bitbucket.org/fynloh/hatschi/commits/72d24ad004ecaec15f02f4cb7ea49e0d9d709bfe)
* test(chat service): fix test suite [view](https://bitbucket.org/fynloh/hatschi/commits/f1f6234bbe5c43164f88bfca1a60af8c7c676d90)
* fix(tests): fix all test suites [view](https://bitbucket.org/fynloh/hatschi/commits/292c16caf3779224a778286326bf44d22132785a)
* chore(release): bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/0e83ce02614c49697918e41e4b477d548b323073)


## 0.8.1 (2021-03-01)

* fix(authentication): generate new custom token for mobile device and browser [view](https://bitbucket.org/fynloh/hatschi/commits/83f239781722c1ee57f4e554b335c8057d0df78e)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/c5e139a48a53ed3a8d171ad8a48bcb574516bac0)


## 0.8.0 (2021-02-28)

* chore(version): fix version number [view](https://bitbucket.org/fynloh/hatschi/commits/96da3091a877105023f52e68b4104d51fcd98c8a)
* chore(version): fix version number in package.json [view](https://bitbucket.org/fynloh/hatschi/commits/cf0aec45abff10224884620f7bb6586436929f28)
* chore(version): fix version number in package-lock.json [view](https://bitbucket.org/fynloh/hatschi/commits/0e9fcbef8bb6f5c5de84d05b618cb2c1b6773618)
* feat(new chat): insert ability to start new chat in browser [view](https://bitbucket.org/fynloh/hatschi/commits/33209a5671758cc922054f2aae53b9d1f9e61337)
* feat(accessToken): generate accessToken and store it in realtime database [view](https://bitbucket.org/fynloh/hatschi/commits/c97d592a4fa3baa4ed62886e28ec2b935acbcdf2)
* feat(browser): show error when password is invalid [view](https://bitbucket.org/fynloh/hatschi/commits/f2cef3cb9b37f7742b94c50578622ac7e774da0f)
* fix(function): adjust error handling [view](https://bitbucket.org/fynloh/hatschi/commits/6b456888d6b13f23c9420586786cd49c02d3e37b)
* refactor(chat service): move thread opening mechanism to service [view](https://bitbucket.org/fynloh/hatschi/commits/a46746d0fe5f60694d194c8f1cc430186e2a7941)
* feat(qrcode): abort encryption of hatschi identity when password is to weak [view](https://bitbucket.org/fynloh/hatschi/commits/8a4cb6df6a8513864f21b0e64a22b50978fad959)
* feat(qrcode): show hint for password requirements [view](https://bitbucket.org/fynloh/hatschi/commits/e6bfcf589dc8847d253f42da6b889a0fa0c85959)
* refactor(chat service): adjust class method types [view](https://bitbucket.org/fynloh/hatschi/commits/b5d3d7f2299310c724f53d49bc68247c48721efb)
* refactor(services): adjust secure storage handling [view](https://bitbucket.org/fynloh/hatschi/commits/42d06a70d1c6bdebe635a6057f13c7c3e5fb2fec)
* refactor(app): remove useless public keyword [view](https://bitbucket.org/fynloh/hatschi/commits/8921619f1d50fd5cbb191e0f63f0f39dff482494)
* fix(functions): handle error in different ways [view](https://bitbucket.org/fynloh/hatschi/commits/498c2357068e12fa92d0bf7c1f47528dbe7febb9)
* feat(firebase): insert authentication service [view](https://bitbucket.org/fynloh/hatschi/commits/cfc05cf0aeb5dcb8bd9ad44006ce3add167ee17d)
* feat(firebase): insert further security rules for the realtime database [view](https://bitbucket.org/fynloh/hatschi/commits/27f32b415a02fda271f10e5c0ffde32ab7f2ec34)
* feat(firebase): update auth persistence state [view](https://bitbucket.org/fynloh/hatschi/commits/619dfe42e8bde12d8b7d7dc1f4402c8614f3309e)
* feat(firebase): replace hatschi id with uuid in access token process [view](https://bitbucket.org/fynloh/hatschi/commits/f0301ca77defc91e1d23360b4574315c1b6553bb)
* test(message input): insert unit tests [view](https://bitbucket.org/fynloh/hatschi/commits/97e2e1cc77bd21fb4a26c7c252cc24319a6f7411)
* test(new chat input): write basic tests [view](https://bitbucket.org/fynloh/hatschi/commits/68a685ceb3730015ef58b4139cd57156a39be3c1)
* feat(firebase): update uuid authentication flow to secure realtime database [view](https://bitbucket.org/fynloh/hatschi/commits/8c4953e0a3963554b710cb475f2eebebc49693ad)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/0b5cb7cfc8da3d124972badafc030d64a76c6d39)


## 0.7.1 (2021-02-18)

* chore(authors): adjust authors of project [view](https://bitbucket.org/fynloh/hatschi/commits/8c12a6f40671240b63fc79d19b15d23ddd71f4d4)
* chore(deps): fix peer dependency error [view](https://bitbucket.org/fynloh/hatschi/commits/6e13959560809fe0771aaa8327cc1ed8dd479053)
* fix(desktop): redirect user after correct password [view](https://bitbucket.org/fynloh/hatschi/commits/7a499002f87f3a3343dd424c46f34470df4ea634)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/c139f3852914a625d1886cae271289fda3bb44e2)


## 0.7.0 (2021-02-17)

* feat(new chat): start a new chat from home page with floating action button [view](https://bitbucket.org/fynloh/hatschi/commits/ec43197eca9dcd274591af70651cafce4094f4e1)
* feat(layout): remove tabs [view](https://bitbucket.org/fynloh/hatschi/commits/a02fc29dd59f389e1c5c87a5ee9c75c64e4e3270)
* feat(qrscanner): adjust animation when scanner is closed [view](https://bitbucket.org/fynloh/hatschi/commits/955dc6869343b9029390c281cfdbc00c0f0d80bf)
* feat(hatschiID): convert hatschiID always to lowercase [view](https://bitbucket.org/fynloh/hatschi/commits/916b29fac087b430e509a97f5ca171349baf5e81)
* feat(hatschiID): show users hatschi id on start screen [view](https://bitbucket.org/fynloh/hatschi/commits/d96644f8c948e67e97a58ab08d858ec729ddea6d)
* fix(isolated storage): set static port for origin [view](https://bitbucket.org/fynloh/hatschi/commits/d384ce3d0c5da63c347692f29aabecc34ea50602)
* chore(deps): update packages [view](https://bitbucket.org/fynloh/hatschi/commits/559469a9242e98bf11151b87c7274931371e4ce1)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/07d1c22a7f72d9ff9ddbf5a7cada16792016343f)


## 0.6.2 (2021-02-17)

* feat(browser): adjust layout of browser application [view](https://bitbucket.org/fynloh/hatschi/commits/496f5368ae3532664b23ca8df5daf3318879eb42)
* fix(browser): wait for password input before decrypting hatschi identity [view](https://bitbucket.org/fynloh/hatschi/commits/b3aa478d36f474db22dc37fdd17d9ff7cf0386d1)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/3e77ba939088421ff11f0b311647128c5fc0bd38)


## 0.6.1 (2021-02-15)

* fix(start): adjust behaviour on start up on mobile and web [view](https://bitbucket.org/fynloh/hatschi/commits/fd4fd90075d6bf2ffdbf192b6fcaaed97b25de6c)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/54e90fd22d6205bfd0a5b564b0d2555855b55702)


## 0.6.0 (2021-02-15)

* feat(storage): insert isolated local storage to store secret key [view](https://bitbucket.org/fynloh/hatschi/commits/79c5caea19da3c82c1ca84faa9b6afc373b564be)
* feat(session storage): store hatschiID in session storage [view](https://bitbucket.org/fynloh/hatschi/commits/4b0eeeedbac7e7231a55b91a5d8e38a285ac4d89)
* refactor(storage): insert typescript version and instruction to generate js file [view](https://bitbucket.org/fynloh/hatschi/commits/e1990396e2007602d27c326871e5ce9d7ad3dbdd)
* feat(browser): insert first concept of desktop web page [view](https://bitbucket.org/fynloh/hatschi/commits/4822c697601ee8d1eaf837bfbd5c34f3141b504d)
* feat(browser): insert ability to text with people [view](https://bitbucket.org/fynloh/hatschi/commits/3c309d094941cd2389201946afff00501de408a0)
* refactor(eslint): automated eslint fix [view](https://bitbucket.org/fynloh/hatschi/commits/0634f79d6d1f5ef0f930014d7e78a5bc562d6963)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/94e63c2f4aa0e40e6b516056472ac75c12c4de99)


## 0.5.0 (2021-02-11)

* fix(secure storage): initialize secure storage before every further action [view](https://bitbucket.org/fynloh/hatschi/commits/407440194a853bfba0a163fa2a8ba0dd39481ea6)
* feat(device): check for current platform on start up [view](https://bitbucket.org/fynloh/hatschi/commits/993fac17f0e6108898800fa3fb0354cc016955db)
* fix(chat list): check if hatschiID is already stored in chat, 		otherwise get ID from secure Storage [view](https://bitbucket.org/fynloh/hatschi/commits/22f67ca47624f4cafa1f20fd9db323b42523dd7f)
* feat(qrcode): creat qrcode on browser with random session id [view](https://bitbucket.org/fynloh/hatschi/commits/d1bb404d6c1162989b4cbef4da25af5f27d4da20)
* feat(cordova): insert qrscanner plugin [view](https://bitbucket.org/fynloh/hatschi/commits/bfec56513cf712b465808253b5fc344a327aa6bb)
* feat(browser): encrypt and export hatschi identity for browser usage [view](https://bitbucket.org/fynloh/hatschi/commits/459e885654e0f4d7d12494f89152211683c386c6)
* chore(deps): update dependencies to latest version [view](https://bitbucket.org/fynloh/hatschi/commits/f8c53cc8194e6ad85272bad12777e95b99dbdc8c)
* feat(identity): encrypt identity from passphrase chosen by user [view](https://bitbucket.org/fynloh/hatschi/commits/31c6d1d3413a8b3e743be8fcb23a1d0a5bef1170)
* feat(qrcode): insert ability to scan qrcode [view](https://bitbucket.org/fynloh/hatschi/commits/ed537c1d4df391dc72cf9d2a14690f577f5408df)
* fix(husky): jump back to v4 [view](https://bitbucket.org/fynloh/hatschi/commits/ac447a1cc166132d754141bb8b6d1d8df9d397ac)
* feat(identity): send identity to firebase and wait for it in browser [view](https://bitbucket.org/fynloh/hatschi/commits/b9559ceb7b26d32cae27f2eaa730681b0fbe7060)
* fix(qrscanner): move qrscanner to page [view](https://bitbucket.org/fynloh/hatschi/commits/d6ae92d5d2ac05f72c6dde1fe917d997b0202819)
* feat(browser): receive hatschi identity [view](https://bitbucket.org/fynloh/hatschi/commits/2fde2281fe60d60986ac41b3609d6eb7173a26d8)
* feat(husky): update husky to v5 [view](https://bitbucket.org/fynloh/hatschi/commits/23bd7eb9abf6734ef4f125d30188383b55f81802)
* chore(comment): insert hint to insert line for production [view](https://bitbucket.org/fynloh/hatschi/commits/3caec45c7acf0b53abaaf7ec03d0127db3bd7dc6)
* chore(eslint): fix eslint problems [view](https://bitbucket.org/fynloh/hatschi/commits/e97ac3421ab97d9c017e86032d39ce396d8a7951)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/645cd2cd665ac377cad2e0db3f95adfd0dd36d9e)


## 0.4.0 (2021-02-03)

* feat(chat): scroll to last message automatically [view](https://bitbucket.org/fynloh/hatschi/commits/c1c121961147e069df2c844d64c0daf17cba35a9)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/8255f465dcd377b7aec35b7ebd3055b3417e847f)


## 0.3.3 (2021-02-03)

* perf(chats): unsubsribe from message observable [view](https://bitbucket.org/fynloh/hatschi/commits/c3725a023839d6f91d51c118465d24a126b8b6cc)
* fix(chat list): render chat list every time the tab is opened [view](https://bitbucket.org/fynloh/hatschi/commits/0c40084e50bdf7f045e751b522dbf03da1405b98)
* chore(eslint): fix unused typescript import [view](https://bitbucket.org/fynloh/hatschi/commits/9b9717bf9fa966faa4fc863eb23ac6c2dd6a1c87)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/aa4ac501543bf997026f4cb63ec6304b2921b69f)


## 0.3.2 (2021-02-02)

* fix(chat): insert secret key to chat page when opened from chat list [view](https://bitbucket.org/fynloh/hatschi/commits/a185779e5d14acba9241aaa6d1b6c792673bf696)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/96c31a607c06c944d7664b34fd12844804e4308b)


## 0.3.1 (2021-02-01)

* chore(deps): raise deps to latest minor version [view](https://bitbucket.org/fynloh/hatschi/commits/a62e23c268ab79c09feb90452cfcaa1be3f85f91)
* feat(username): change username and store that locally [view](https://bitbucket.org/fynloh/hatschi/commits/4de4604a18943d1a82f92d63e194f38267664896)
* feat(security): insert encryption and decryption to chat [view](https://bitbucket.org/fynloh/hatschi/commits/cc528e8123427186a555d1bd140224792015d5ba)
* chore(config): update version number [view](https://bitbucket.org/fynloh/hatschi/commits/e4047d2f0966abe5fc40df82864661cec524ddd3)
* fix(secure storage): insert polyfill and check for set lock screen [view](https://bitbucket.org/fynloh/hatschi/commits/e6cfe095c1ecd33dae25b40d55822725b2221c53)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/c2389cafd77f9a313d1f53481bdc34eb353615ec)


## 0.3.0 (2021-02-01)

* chore(deps): update all dependencies [view](https://bitbucket.org/fynloh/hatschi/commits/1a38e9c716d09ceed4e9248a1860694c72d3a833)
* feat(messages): send messages to firebase and create threads [view](https://bitbucket.org/fynloh/hatschi/commits/0b75e8518530680fe420645a975357d3fe317f61)
* refactor(chat): adjust variable names of hatschiIDs [view](https://bitbucket.org/fynloh/hatschi/commits/c639e7c285538358e170c78e4f0e4d26a237ddb5)
* feat(threads): check if user exists before creating a thread [view](https://bitbucket.org/fynloh/hatschi/commits/153acd024b011fe5724cf4cf52e16fca02abe02c)
* feat(chat list): show a list of chats [view](https://bitbucket.org/fynloh/hatschi/commits/3ad60211f1beadb9da6e6273257192cc9c492e92)
* chore(chat list): adjust template structure [view](https://bitbucket.org/fynloh/hatschi/commits/13cb5bb5f8bdeff8a4cd0e94387838ba40ca2b29)
* feat(user): insert first approach to edit name of users [view](https://bitbucket.org/fynloh/hatschi/commits/ba5ff590db08108208b4f8d834112798a968b248)
* chore(eslint): remove cache [view](https://bitbucket.org/fynloh/hatschi/commits/6dde6cb05d3d70f805ecfb173d0ec8da59b7f6a6)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/69eca9730374c7cdfd8bebd20a77fdf4c317044e)


## 0.2.0 (2021-01-29)

* feat(icons): insert icons and splash screen [view](https://bitbucket.org/fynloh/hatschi/commits/072f88419bb837e5b67aeb223da45cb5ee7552cb)
* feat(encryption): insert first approach fo encryption and decryption [view](https://bitbucket.org/fynloh/hatschi/commits/35a56936566c93f5f1cfaac173a951a31ddee55d)
* feat(messages): remove padding [view](https://bitbucket.org/fynloh/hatschi/commits/ffb255af5fa3d9f671f2a2adc77570be62cf02d0)
* style(firebase): remove firebase login and registration [view](https://bitbucket.org/fynloh/hatschi/commits/6cfd075b636587445ef577acb5d07feeeb88ef1d)
* feat(security): create key pair on app initialization [view](https://bitbucket.org/fynloh/hatschi/commits/3e3cda75404298275f716f8626555c68db1111ab)
* feat(security): send public key to firebase realtime database [view](https://bitbucket.org/fynloh/hatschi/commits/60e38daecf8ae9eca74d5dbfb8f74162528974a0)
* feat(security): add secure storage and insert generated secret key [view](https://bitbucket.org/fynloh/hatschi/commits/67c0228395e1b5a4f6187f29755ca01651e70477)
* feat(messages): send message to firebase [view](https://bitbucket.org/fynloh/hatschi/commits/555f6521a2bda0f11ff83bedf47d25b35df61945)
* feat(appflow): insert ionic appflow connection [view](https://bitbucket.org/fynloh/hatschi/commits/c419259e4967d809834d072a29bcb591eae149ff)
* feat(appflow): add appflow sdk [view](https://bitbucket.org/fynloh/hatschi/commits/3db5e9e833453b7fbcfa8bba4b935a9be45fd233)
* feat(firebase): insert functions and adjust firebase config [view](https://bitbucket.org/fynloh/hatschi/commits/efa0b7b1e1ee34a566a3d5a1f6bbbd63c5b13f5b)
* feat(secure storage): store secret + public key and hatschiID in secure storage [view](https://bitbucket.org/fynloh/hatschi/commits/b2b4cc94e6a78db68331fcbd6430e94e918d50ab)
* chore(gitignore): adjust tmp directory path [view](https://bitbucket.org/fynloh/hatschi/commits/06f8e353bd95dffdc56701582ef55a1f2b25d546)
* Bump version number [view](https://bitbucket.org/fynloh/hatschi/commits/065012e847dd52245e0640af2581ffeb97aa76f9)


