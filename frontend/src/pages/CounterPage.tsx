import { useAppDispatch, useAppSelector } from '../store/hooks';
import { decrement, increment, reset } from '../store/features/counterSlice';

export default function CounterPage () {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()
  return (
    <div className="flex mt-20 justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Counter App</h1>
        <div className="text-5xl font-semibold text-blue-600 mb-8">{count}</div>
        
        <div className="flex justify-center gap-4">
          <Button bgColor='bg-red-500' hoverBgColor='bg-red-600' clickHandler={() => dispatch(decrement())} content='Decrement' />
          <Button bgColor='bg-yellow-500' hoverBgColor='bg-yellow-600' clickHandler={() => dispatch(reset())} content='Reset' />
          <Button bgColor='bg-green-500' hoverBgColor='bg-green-600' clickHandler={() => dispatch(increment())} content='Increment' />
        </div>
      </div>
    </div>
  );
};

type TailWindColor = "slate"| "gray"| "zinc"| "neutral"| "stone"| "red"| "orange"| "amber"| "yellow"| "lime"| "green"| "emerald"| "teal"| "cyan"| "sky"| "blue"| "indigo"| "violet"| "purple"| "fuchsia"| "pink"| "rose"
type TailwindShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;


type ButtonType = {
  clickHandler: React.MouseEventHandler<HTMLButtonElement>,
  bgColor: `bg-${TailWindColor}-${TailwindShade}`,
  hoverBgColor: `bg-${TailWindColor}-${TailwindShade}`,
  content: string
}

const Button: React.FC<ButtonType> = ({clickHandler, bgColor, hoverBgColor, content}) => {
  return <button onClick={clickHandler} className={`${bgColor} hover:${hoverBgColor} text-white px-6 py-2 rounded-lg shadow transition duration-300 cursor-pointer`}>{content}</button>
}
