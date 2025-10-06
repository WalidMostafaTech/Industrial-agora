import Avatar from "../../components/common/Avatar";

const PaymentPage = () => {
  return (
    <article className="container pagePadding">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="whiteContainer flex flex-col justify-between gap-8">
          <ul className="space-y-4">
            <li className="flex justify-between gap-2 text-lg">
              <p>Subtotal</p>
              <span>100 $</span>
            </li>
            <li className="flex justify-between gap-2 text-lg">
              <p>Shipping</p>
              <span>20 $</span>
            </li>
            <li className="flex justify-between gap-2 text-lg font-bold border-t border-gray-300 pt-4">
              <p>Total</p>
              <span>120 $</span>
            </li>
          </ul>

          <button className="animationBtn mx-auto">Membership renewal</button>
        </aside>

        <section className="whiteContainer lg:col-span-2 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
            <div className="flex-1 flex items-center gap-2">
              <Avatar name={"walid mostafa"} size="lg" />
              <div className="flex-1">
                <h4 className="text-lg lg:text-2xl font-bold capitalize line-clamp-1 flex-1 break-all">
                  {"walid mostafa"}
                </h4>

                <p className="text-lg font-medium line-clamp-1 break-all w-fit">
                  Member
                </p>
              </div>
            </div>

            <span className="text-myBlue-2 text-2xl font-semibold">100 $</span>
          </div>

          <div className="pb-4 border-b border-gray-300">
            <h3 className="text-2xl font-bold mb-2">Person Card:</h3>
            <ul>
              <li className="flex gap-2 lg:text-lg">
                <p>name:</p>
                <span className="font-semibold text-myBlue-2">
                  walid mostafa
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Occupation:</p>
                <span className="font-semibold text-myBlue-2">
                  Software Engineer
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Phone:</p>
                <span className="font-semibold text-myBlue-2">
                  +20123456789
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Email:</p>
                <span className="font-semibold text-myBlue-2">
                  walid@email.com
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Address Card:</h3>
            <ul>
              <li className="flex gap-2 lg:text-lg">
                <p>Address:</p>
                <span className="font-semibold text-myBlue-2">
                  12 El Nakhil Street, 6th District, Nasr City, Cairo
                </span>
              </li>
              <li className="flex gap-2 lg:text-lg">
                <p>Postal Code:</p>
                <span className="font-semibold text-myBlue-2">12345</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
};

export default PaymentPage;
