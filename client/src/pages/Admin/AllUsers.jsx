import AdminLayout from "../../components/AdminLayout";
const projects = [];
function AllUsers() {
    return (
        <AdminLayout>
            <div className='product-grid-container'>
                <div className="ProductContainer">
                    <div className="w-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Total Post</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects?.map((p, i) => (

                                    <tr>
                                        <th key={i} scope="row">{i + 1}</th>
                                        <td>p</td>
                                        <td>p.developer</td>
                                        <td>p.city</td>
                                        <td>₹ p.pricing.startingFrom</td>
                                        <td>p.contactInformation.phone</td>
                                        <td>p.createdAt</td>
                                        <td><button className="p-2 no-border bg-success text-white rounded"><FiEdit /></button></td>
                                        <td><button className="p-2 no-border bg-red-500 text-white rounded"><BsTrash /></button></td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AllUsers