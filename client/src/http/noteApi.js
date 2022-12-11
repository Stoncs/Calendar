import {$host} from "./index";

export const create = async (text, date) => {
  const {data} = await $host.post("api/notes/", {text, date});
  return data;
};

export const getAll = async () => {
  const {data} = await $host.get("api/notes/");
  return data;
};

export const deleteById = async (id) => {
  const {data} = await $host.delete("api/notes/delete/" + id);
  return data;
};