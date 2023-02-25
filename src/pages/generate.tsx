import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Grid from "../components/Grid";
import RadioInput from "../components/RadioInput";
import { api } from "../utils/api";
import {
  avatarColors,
  avatarShapes,
  avatarStyles,
  generateFormDefaultState,
} from "../utils/constants";

export type TFormState = {
  prompt: string;
  color: string;
  style: string;
  shape: string;
  amount: number;
};

const Generate: NextPage = () => {
  const [formState, setFormState] = useState<TFormState>(
    generateFormDefaultState
  );

  const canSubmitForm = Object.values(formState).every((i) => !!i === true);

  const handleFormChange = (name: keyof TFormState, value: string | number) => {
    setFormState((prev) => {
      if (name === "amount" && value > 5) {
        return { ...prev, amount: 5 };
      }
      if (!isNaN(Number(value)) && value != 0) {
        return { ...prev, [name]: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleGenerate = () => {
    refetch();
  };

  const utils = api.useContext();
  const { data: sessionData } = useSession();
  const {
    data: generateResult,
    fetchStatus: generateFetchStatus,
    isInitialLoading: generateInitialLoading,
    refetch,
  } = api.generate.generate.useQuery(formState, {
    enabled: false,
    onSuccess() {
      utils.user.currentUser.invalidate();
    },
  });

  const isGenerateLoading =
    generateInitialLoading || generateFetchStatus === "fetching";

  return (
    <main className="mx-auto flex flex-col">
      <>
        <h1 className="text-3xl font-bold text-white">
          Configure your prompts
        </h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-6 flex flex-col gap-4"
        >
          <fieldset className="mb-4 flex flex-col">
            <label className="text-white">Main icon object</label>
            <input
              type="text"
              name="prompt"
              placeholder="A happy panda..."
              className="input-bordered input mt-2 w-full"
              value={formState.prompt}
              onChange={(e) => handleFormChange("prompt", e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-4">
            <label className="text-white">Choose a color</label>
            <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              {avatarColors.map((item) => (
                <RadioInput
                  name="color"
                  key={item.color}
                  color={item.color}
                  label={item.label}
                  onChange={() => handleFormChange("color", item.color)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mb-4">
            <label className="text-white">Style</label>
            <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              {avatarStyles.map((item) => (
                <RadioInput
                  name="style"
                  key={item.label}
                  image={item.image}
                  label={item.label}
                  onChange={() => handleFormChange("style", item.label)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mb-4">
            <label className="text-white">Choose a shape</label>
            <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              {avatarShapes.map((item) => (
                <RadioInput
                  name="shape"
                  key={item.label}
                  label={item.label}
                  onChange={() => handleFormChange("shape", item.label)}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="mb-4 flex flex-col">
            <label className="text-white">Amount of icons (max: 5)</label>
            <input
              type="number"
              placeholder="Enter an amount..."
              name="amount"
              className="input-bordered input mt-4 w-full"
              value={formState.amount}
              min={1}
              max={5}
              onChange={(e) => handleFormChange("amount", e.target.value)}
            />
          </fieldset>
          <button
            className={`btn-secondary btn mb-8 ${
              isGenerateLoading && "loading"
            }`}
            disabled={!sessionData || !canSubmitForm || isGenerateLoading}
            onClick={handleGenerate}
          >
            {sessionData ? "Generate!" : "Must sign in!"}
          </button>
        </form>
        {generateResult && (
          <>
            <div className="divider"></div>
            <h2 className="my-8 text-center text-2xl text-white">
              Your avatars:
            </h2>
            <Grid>
              {generateResult.map((image) => {
                return (
                  <img
                    key={image.b64_json}
                    className="basis-1/6 rounded-3xl"
                    src={`data:image/png;base64, ${image.b64_json}`}
                    alt="Generated image"
                  />
                );
              })}
            </Grid>
          </>
        )}
      </>
    </main>
  );
};

export default Generate;
