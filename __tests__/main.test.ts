import utils from "../src/utils";

test("split by 'at'", () => {
  const input = "a@url_a \n b@url_b \n c@url_c";
  const parts = utils.splitByNewLlne(input)
  const links = parts.map(utils.createReleaseLink);

  console.log(links)
});