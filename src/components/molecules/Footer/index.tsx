const Footer = () => {
  return (
    <div className="px-10 mt-20 lg:mt-0">
      <div className="flex justify-between mb-5">
        <h2 className="text-black text-xl font-bold dark:text-white">
          Clamployalty
        </h2>
        <ul>
          <li className="rounded-[5px] cursor-pointer bg-grey/20"></li>
          <li></li>
        </ul>
      </div>
      <p className="max-w-[350px] mb-[40px] text-base text-grey">
        With our loyalty management platform, businesses can overcome the
        challenges of customer retention and maximize customer lifetime value.
      </p>
      <span className="text-grey">© 2023</span>
    </div>
  );
};

export default Footer;
