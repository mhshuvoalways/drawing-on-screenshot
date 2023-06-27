import Image from "../../assets/ss.jpg";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="space-y-5">
      <Link to="/">
        <i className="fa-solid fa-arrow-left cursor-pointer"></i>
      </Link>
      <p className="text-xl font-semibold">
        Lorem ipsum dolor sit amet, cons adipiscing elit
      </p>
      <img src={Image} className="w" />
      <p className="leading-relaxed tracking-wider">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
        vestibulum felis, ut consectetur leo. Curabitur quis tincidunt sem. Nunc
        euismod malesuada tellus, eget egestas mauris varius et. Donec eu libero
        eu nisi fringilla sagittis posuere at ante. Nam non sem enim. Sed tellus
        diam, mollis sed rutrum placerat, euismod a elit. Aenean eleifend justo
        lacinia feugiat eleifend.
        <br />
        <br />
        Morbi et egestas lectus, ut fringilla purus. Nunc volutpat mi nisi, vel
        pretium augue sagittis ut. Sed vitae bibendum urna, non mollis erat.
        Proin sit amet viverra nisl. Proin vitae purus vitae leo pellentesque
        pretium.{" "}
        <small>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
          vestibulum felis, ut consectetur leo. Curabitur quis tincidunt sem.
        </small>
        Nunc euismod malesuada tellus, eget egestas mauris varius et. Donec eu
        libero eu nisi fringilla sagittis posuere at ante. Nam non sem enim.
        <br />
        Sed tellus diam, mollis sed rutrum placerat, euismod a elit. Aenean
        eleifend justo lacinia feugiat eleifend. Morbi et egestas lectus, ut
        fringilla purus.
        <p className="underline">
          {" "}
          Nunc volutpat mi nisi, vel pretium augue sagittis ut.
        </p>
        Sed vitae bibendum urna, non mollis erat. Proin sit amet viverra nisl.
        Proin vitae purus vitae leo pellentesque pretium.
      </p>
    </div>
  );
};

export default index;
