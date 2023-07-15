import { BsGithub, BsLinkedin, BsPersonRolodex } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer items-center p-4 mt-10 ">
      <div className="items-center grid-flow-col">
        <p className="ml-1">
          Copyright © 2023 - All wrongs reversed, all lefts reserved, and all
          funnies preserved.
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <div className="tooltip" data-tip="Github">
          <a
            target="_blank"
            href="https://github.com/FarhanZizz/"
            rel="noreferrer"
          >
            <BsGithub className="text-[26px] text-primary"></BsGithub>
          </a>
        </div>
        <div className="tooltip" data-tip="Linkedin">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/farhan-zizz/"
            rel="noreferrer"
          >
            <BsLinkedin className="text-[26px] text-primary"></BsLinkedin>
          </a>
        </div>
        <div className="tooltip" data-tip="Portfolio">
          <a
            target="_blank"
            href="https://farhanzizz.netlify.app/"
            rel="noreferrer"
          >
            <BsPersonRolodex className="text-[26px] text-primary"></BsPersonRolodex>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
