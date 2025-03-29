import AllEnrollments from "../../components/allEnrollmentsComponent/allEnrollments";

export default function AllEnrollmentsPage() {
    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <form action="#" className="border-2 rounded border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 mx-auto max-w-screen-xl py-4 2xl:px-0">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All Enrollments</h2>
                    <div className="mt-6 sm:mt-8">
                        <AllEnrollments />
                    </div>
                </div>
            </form>
        </section>
    );
}