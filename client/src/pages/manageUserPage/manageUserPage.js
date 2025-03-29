import ManageUser from "../../components/ManageUserComponent/manageUser";

// Breadcrumbs component
const Breadcrumbs = () => {
    return (
        <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex">
                <li className="mr-2">
                    <a href="/home" className="text-blue-500 hover:text-blue-700">Home</a>
                </li>
                <li className="mr-2">
                    <svg className="rtl:rotate-180 w-3.5 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </li>
                <li className="mr-2">
                    <span className="text-gray-500">Manage Users</span>
                </li>
            </ol>
        </nav>
    );
};

export default function manageUserPage() {
    return (
        <section className="container mx-auto mt-4 mb-16 px-16">
            <Breadcrumbs/>
            <div className="max-w-4xl mx-auto">
                <h2 className="font-mono text-2xl font-semibold text-center sm:text-5xl">Manage all Users</h2>
                <div className="grid grid-cols-1 mt-8 sm:grid-cols-2">
                    <ManageUser />
                </div>
            </div>
        </section>
    )
}