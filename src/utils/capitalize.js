function capitalize(string) {
  let list = string.split(" ");

  for (let i = 0; i < list.length; i++) {
    list[i] = list[i].charAt(0).toUpperCase() + list[i].slice(1);
  }

  return list.join(" ");
}

export default capitalize;
