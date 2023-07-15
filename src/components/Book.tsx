const Book = () => {
  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg"
        alt="Book Image"
        className="w-2/3 md:w-full mx-auto"
      />

      <div className="mt-2">
        <h1 className="font-bold text-center ">To Kill a Mockingbird</h1>
        <h4 className="text-sm text-center">Harper Lee</h4>
      </div>
    </div>
  );
};

export default Book;
