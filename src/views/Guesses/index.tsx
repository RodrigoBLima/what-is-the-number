import React from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { fetchRandomValue } from "../../services/FetchRandomValue";

import classNames from "classnames";
import SevenSegment from "../../components/SevenSegment";

function Guesses() {
  const [randomValue, setRandomValue] = React.useState(0);

  const [valueToCompare, setValueToCompare] = React.useState("");
  const [auxValueToCompare, setAuxValueToCompare] = React.useState("");

  const [error, setError] = React.useState("");

  const [isSubmited, setIsSubmited] = React.useState(false);

  React.useEffect(() => {
    handleFetchRandomValue();
  }, []);

  async function handleFetchRandomValue() {
    const { value, response } = await fetchRandomValue();

    if (response?.data?.StatusCode) {
      setError(response?.data?.StatusCode);
    }

    setRandomValue(value);
  }

  function handleFetchNewMatch() {
    handleClearFields();
    handleFetchRandomValue();
  }

  function handleClearFields() {
    setValueToCompare("");
    setAuxValueToCompare("");
    setIsSubmited(false);
    setError("");
  }

  function handleChangeGuessInput(event: React.FormEvent<HTMLInputElement>) {
    const newValue = (event.target as HTMLInputElement).value.replace(
      /[^0-9]/g,
      ""
    );

    setValueToCompare(newValue);
  }

  function handleCompareValue() {
    setAuxValueToCompare(valueToCompare);
    setValueToCompare("");
    setIsSubmited(true);
    setError("");
  }

  const valueIsHigher = randomValue > parseInt(auxValueToCompare);

  const valueIsLower = randomValue < parseInt(auxValueToCompare);

  const valuesAreEquals = randomValue === parseInt(auxValueToCompare);

  function handleResolveMessage() {
    if (error) {
      return "Erro";
    }

    if (!isSubmited) {
      return "";
    }

    if (valueIsHigher) {
      return "É maior";
    }

    if (valueIsLower) {
      return "É menor";
    }

    if (valuesAreEquals) {
      return "Você acertou!!!";
    }

    return "";
  }

  function handleResolveCounterValue() {
    if (error) {
      return error?.toString();
    }

    if (isSubmited) {
      return auxValueToCompare;
    }

    return "0";
  }

  function handleResolveColor() {
    if (error) {
      return "red";
    }

    if (valuesAreEquals) {
      return "green";
    }

    return "";
  }
  
  const messageAlert = handleResolveMessage();
  const sevenSegmentColor = handleResolveColor();
  const sevenSegmentValue = handleResolveCounterValue();
  const hasError = Boolean(error);
  const showRefreshGueess = hasError || valuesAreEquals;
  const disableButtonSend =
    valueToCompare.length === 0 || hasError || valuesAreEquals;
  const maxLengthInputGuess = randomValue?.toString()?.length;

  return (
    <div id="guessess-page-container">
      <header>
        <h2 className="title">Qual é o número?</h2>
        <hr />
      </header>

      <section className="body">
        <p
          className={classNames({
            message: true,
            green: valuesAreEquals,
            red: Boolean(error),
          })}
        >
          {messageAlert}
        </p>

        <div
          className={classNames({
            counter: true,
          })}
        >
          <SevenSegment
            color={sevenSegmentColor}
            displayNumber={sevenSegmentValue}
          />
        </div>

        <button
          type="button"
          onClick={() => handleFetchNewMatch()}
          className={classNames({ show: showRefreshGueess })}
        >
          <RefreshIcon />
          Nova partida
        </button>
      </section>

      <footer>
        <Input
          id="guess-input"
          name="guess-input"
          value={valueToCompare}
          maxLength={maxLengthInputGuess}
          placeholder="Digite o palpite"
          onChange={(event) => handleChangeGuessInput(event)}
        />
        <Button
          label="Enviar"
          onClick={() => handleCompareValue()}
          disabled={disableButtonSend}
        />
      </footer>
    </div>
  );
}

export default Guesses;
