export default function KittenControls() {
  return(
    <div className="sticky h-min p-2 bg-accent-lightest/80 backdrop-blur-md flex flex-row justify-start items-center gap-2">
      <div className="flex flex-row items-center">
        <label
          htmlFor="litterSize"
        >Number of Kittens: </label>
        <input
          className="rounded-md bg-white/70 p-1 ml-1 border-2 border-accent-light"
          type="number"
          name="litterSize"
          id="litterSize"
          min={1}
          max={10}
          defaultValue={4}
        >
        </input>
      </div>
      <input
        className="rounded-xl px-2 py-1 font-bold cursor-pointer bg-tortie-lilac hover:scale-110 hover:bg-tortie-fawn active:shadow-inner transition duration-700 ease-in-out"
        type="submit"
        value="Generate Kittens"
      >
      </input>
    </div>
  )
}