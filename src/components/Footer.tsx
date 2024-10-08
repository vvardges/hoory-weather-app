import GitHubIcon from "./Icons/GitHubIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer ({ darkMode }: FooterProps) {
  return (
    <div
      className={`${
        darkMode ? "dark" : "light"
      } fixed min-w-[300px] bottom-0 inset-x-0 space-x-2 flex dark:bg-neutral-800 p-2 justify-center`}
    >
      <h1 className="font-medium text-xs text-neutral-800 dark:text-neutral-200">
        © 2024 vvardges
      </h1>
      <div className="cursor-pointer flex items-center">
        <a
          type="button"
          href="https://github.com/vvardges"
          target={"_blank"}
          rel="noreferrer"
          className=" text-neutral-800 dark:text-neutral-200"
        >
          <GitHubIcon />
        </a>
      </div>
      <div className="cursor-pointer flex items-center">
        <a
          type="button"
          href="https://www.linkedin.com/in/vardges-vardanyan/"
          target={"_blank"}
          rel="noreferrer"
          className=" text-neutral-800 dark:text-neutral-200"
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}
