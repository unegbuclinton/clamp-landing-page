const Footer = () => {
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2 className="text-black text-xl font-bold dark:text-white">
          Clamployalty
        </h2>
        <ul>
          <li className="rounded-[5px] cursor-pointer bg-light-grey/20"></li>
          <li></li>
        </ul>
      </div>
      <p className="w-[350px] mb-[40px] text-base text-light-grey">
        With our loyalty management platform, businesses can overcome the
        challenges of customer retention and maximize customer lifetime value.
      </p>
      <span className="text-light-grey">© 2023</span>
    </div>
  );
};

export default Footer;
