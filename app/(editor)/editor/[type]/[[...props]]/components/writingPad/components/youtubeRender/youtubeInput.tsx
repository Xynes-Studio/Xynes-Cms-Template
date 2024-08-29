import { TextInput } from "lumia-ui";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface YoutubeLinkModalProps {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
  youtubeLink: () => void;
  setValid: Dispatch<SetStateAction<boolean>>;
}

const YoutubeLinkModal: React.FC<YoutubeLinkModalProps> = ({
  link,
  setLink,
  youtubeLink,
  setValid,
}) => {
  return (
    <TextInput
      value={link}
      validations={[youtubeLink]}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, "event.target.value");

        setValid(true);
        setLink(event.target.value);
      }}
      placeholder="Paste any valid youtube link."
    />
  );
};

export default YoutubeLinkModal;
