import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex flex-center flex-col">
      <h1 className="head_text text-center">
        Discover And Share <br className=" max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Drimprompts lets you create, discover and share creative AI prompts in
        this beautiful world of AI.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
