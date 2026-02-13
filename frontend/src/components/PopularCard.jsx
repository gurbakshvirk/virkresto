
const PopularCard = (props) => {
    return (
        <div className="group relative h-96 w-80 overflow-hidden rounded-tr-2xl rounded-bl-2xl bg-black shadow-lg">
            {/* Image */}
            <img
                src={props.image[0].url}
                alt={props.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black/40"></div> */}

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">

                <h3 className="text-3xl font-bold text-white">
                    {props.title}
                </h3>

                {/* <p className="mt-2 text-sm text-gray-200">
          Juicy patty, fresh veggies & signature sauce
        </p> */}

                <button className="mt-4 w-fit rounded-full bg-yellow-400 border border-white px-6 py-2 hover:bg-yellow-800 hover:scale-110 text-white transition">
            {/* <button className=" text-white rounded-full bg-yellow-400 px-6 py-3 font-semibold hover:bg-yellow-800 hover:scale-110 transition"> */}
                    
                    Explore
                </button>

            </div>
        </div>
    )
}

export default PopularCard

