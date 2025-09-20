export default function KittenControls({outputModeList, onChangeMode}: any) {
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
        className="rounded-xl px-2 py-1 cursor-pointer bg-accent hover:scale-110 hover:bg-accent-cyan active:shadow-inner transition duration-700 ease-in-out"
        type="submit"
        value="Generate Kittens"
        onClick={() => onChangeMode("kittens")}
      >
      </input>
      {
        outputModeList.includes("probabilities") ? 
        <input 
          className="rounded-xl px-2 py-1 cursor-pointer bg-accent hover:scale-110 hover:bg-accent-cyan active:shadow-inner transition duration-700 ease-in-out"
          type="submit"
          onClick={() => onChangeMode("probabilities")}
          value="Calculate Probabilities"
        ></input>
        : ""
      }
    </div>
  )
}