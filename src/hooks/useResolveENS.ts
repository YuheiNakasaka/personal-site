export const useResolveENS = () => {
  return async (input: string) => {
    console.log("=== Requesting: useResolveENS ===")
    if (input && input !== "") {
      const parsedInput = input.trim().toLocaleLowerCase()
      if (parsedInput.endsWith(".eth")) {
        const json = await fetch(`/api/playgrounds/resolve_ens?address=${parsedInput}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        return {
          address: json.address,
        }
      } else if (parsedInput.startsWith("0x")) {
        return {
          address: parsedInput,
        }
      }
      return {
        address: "",
      }
    } else {
      return {
        address: "",
      }
    }
  }
}
