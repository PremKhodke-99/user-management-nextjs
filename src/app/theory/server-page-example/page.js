import { fetchListOfProducts } from "@/actions";

const ServerActionsExample = async () => {

    const products = await fetchListOfProducts();

    // console.log(products);
    return (
        <div>
            <h1>Server Actions Example - serve components</h1>
            <ul>
                {
                    products?.length > 0 ? products.map(item =>
                        <li>
                            {item.title}
                        </li>
                    ) : (
                        <h2>No Products found</h2>
                    )
                }
            </ul>
        </div>
    )
}

export default ServerActionsExample