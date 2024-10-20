import CreateSnippetForm from "@/components/CreateSnippetForm";
import { auth } from "@/auth";

async function CreateSnippetPage() {
    const session = await auth();

    if (session?.user?.id) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <CreateSnippetForm userId={session.user.id} />
            </div>
        );
    }
}
export default CreateSnippetPage;
