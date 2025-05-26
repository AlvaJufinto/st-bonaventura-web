import PrimaryButton from '@/Components/admin/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Wrapper from '@/Layouts/Wrapper';
import {
  Head,
  router,
} from '@inertiajs/react';

export default function Index({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight font-secondary">
          Article
        </h2>
      }
    >
      <Head title="Article" />
      <Wrapper>
        {/* <div className="p-6 text-gray-900">Article List</div> */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-secondary">Article</h1>
          <PrimaryButton onClick={() => router.visit(route("article.create"))}>
            Add Article
          </PrimaryButton>
        </div>
      </Wrapper>
    </AuthenticatedLayout>
  );
}
