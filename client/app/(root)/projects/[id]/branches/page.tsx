"use client";
import { getBranches, getProject } from "@/API/project";
import { Heading, Loader } from "@/components/helpers";
import { ProjectSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/AuthProvider";
import { useQuery } from "@tanstack/react-query";

interface Branch {
  _id: string;
  branch: {
    _id: string;
    createdAt: string;
  };
  by: {
    _id: string;
    username: string;
    name: string;
    avatar?: {
      url: string;
      public_id: string;
    };
  };
}

const BranchCard = ({
  branch,
  isAdmin,
}: {
  branch: Branch;
  isAdmin: boolean;
}) => {
  return (
    <div className="flex items-center justify-between bg-neutral-900 rounded-lg md:max-w-[80%] p-4">
      <p className="text-white text-sm">
        Branch created by: @{branch.by.username} on {branch.branch.createdAt}
      </p>
      {isAdmin && (
        <Button className="bg-white hover:bg-white/90 text-bg ">
          Rollover
        </Button>
      )}
    </div>
  );
};

const AllBranches = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [`project-${id}-branches`],
    queryFn: () => getBranches(id),
  });

  return (
    <section className="my-5">
      {isLoading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        data &&
        data.success &&
        data.response && (
          <>
            <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
              <Heading
                title={`Branches | ${data.response.name}`}
                desc={`View all branches of ${data.response.name}, created by team members or by you`}
              />
            </div>
            <main className="flex justify-center flex-col gap-y-5 md:p-6 p-4">
              {data.response.children.length > 0 &&
                data.response.children.map((branch: Branch) => (
                  <BranchCard
                    branch={branch}
                    isAdmin={user._id === data.response.admin._id}
                    key={branch._id}
                  />
                ))}
            </main>
          </>
        )
      )}
    </section>
  );
};

export default AllBranches;
