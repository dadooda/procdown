
import { assert as a } from "../depsT.ts"
import { mkId } from "./markdown.ts"

Deno.test("mkId()", () => {
  expect("(Kaka (makaka))", "kaka-makaka")
  expect("a0)1!2@3#4$5%6^7&8*9(", "a0123456789")
  expect("b0`1~2-3_4=5+6[7{8]9}", "b012-3_456789")
  expect(`c0\\1|2;3:4'5"6,7<8.9>`, "c0123456789")
  expect(`d0/1?`, "d01")
  expect("-Abc- d-ef", "-abc--d-ef")
  expect("*Abc* d*ef", "abc-def")

  // National characters.
  expect("В чаще леса жил бы ЦИТРУС? Да, но фальшивый экземпляр, ёлы-палы!", "в-чаще-леса-жил-бы-цитрус-да-но-фальшивый-экземпляр-ёлы-палы")
  expect("Хвацький юшковар Філіп щодня на ґанку готує сім'ї вечерю з жаб", "хвацький-юшковар-філіп-щодня-на-ґанку-готує-сімї-вечерю-з-жаб")

  //
  // NOTE: The outputs generated below are yet BROKEN.
  //       If you provide fixes to `mkId()` to make these correct, please send me a pull request.
  //

  // GitHub trickiness.
  expect("_Abc_ d_ef", "_abc_-d_ef")
  //expect("_Abc_ d_ef", "abc-d_ef")    // CORRECT output.

  // National characters.
  expect("Falsches Üben von Xylophonmusik quält jeden größeren Zwerg", "falsches-ben-von-xylophonmusik-qu-lt-jeden-gr-eren-zwerg")
  expect("Cada vez que me trabo, Félix paga un whisky añejo", "cada-vez-que-me-trabo-f-lix-paga-un-whisky-a-ejo")
  expect("Nechť již hříšné saxofony ďáblů rozzvučí síň úděsnými tóny waltzu, tanga a quickstepu", "nech-ji-h-n-saxofony-bl-rozzvu-s-d-sn-mi-t-ny-waltzu-tanga-a-quickstepu")
})

const expect = (input: string, expected: string) => {
  a.assertEquals(mkId(input), expected)
}
