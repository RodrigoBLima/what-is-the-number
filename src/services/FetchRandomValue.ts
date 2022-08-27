import AxiosAdapter from "../infra/http/AxiosAdapter";

export async function fetchRandomValue() {
  try {
    const axiosAdapter = new AxiosAdapter();

    const response = await axiosAdapter.get(
      `${process.env.REACT_APP_API_ENDPOINT}/rand`,
      {
        min: 1,
        max: 300,
      }
    );
    return response;
  } catch (error: any | { Error: string; StatusCode: number }) {
    console.error("error on fetch random value");
    return error;
  }
}
