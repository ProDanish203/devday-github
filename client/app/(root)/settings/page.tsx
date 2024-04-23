"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { ImageUpload } from "@/components/helpers";
import { useAuth } from "@/store/AuthProvider";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/API/auth";

const GeneralSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [info, setInfo] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    country: "",
    phone: "",
  });

  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setInfo((prev) => ({
      ...prev,
      country: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setInfo({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        country: user.country || "",
        bio: user.bio || "",
        phone: user.phone || "",
      });
      user?.avatar?.url && setImage(user.avatar.url);
    }
  }, [user]);

  // Updating profile
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  const handleUpdate = async () => {
    // Validations
    if (!info.username) return toast.error("Username is required");
    if (!info.email) return toast.error("Email is required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email))
      return toast.error("Invalid Email address");
    if (!info.fullName) return toast.error("Fullname is required");
    if (!/\s/.test(info.fullName))
      return toast.error("Please enter your full name (e.g., John Doe)");
    if (info.phone) {
      if (info.phone.length > 11 || info.phone.length < 9)
        return toast.error("Phone number must be atleast 9 to 11 digits");
    }

    const formData = new FormData();
    Object.entries(info).forEach(([key, value]) => {
      if (value !== "") {
        formData.append(key, value);
      }
    });
    file && formData.append("avatar", file);

    const { success, response } = await mutateAsync(formData);
    if (!success) return toast.error(response);
    toast.success("Profile updated");
  };

  return (
    <main className="w-full">
      <section className="md:container max-md:w-full ">
        <Card className="w-full max-w-3xl bg-bg border-none">
          <CardHeader>
            <CardTitle className="sm:text-4xl text-2xl text-text font-semibold mb-1">
              Update Profile
            </CardTitle>
            <CardDescription className="text-para text-sm w-full">
              Manage your profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <ImageUpload
                placeholder="Update Avatar"
                id="avatar"
                image={image}
                setFile={setFile}
                setImage={setImage}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-text">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                className="bg-bg border-neutral-700 text-text"
                value={info.username}
                onChange={handleChange}
                name="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-text">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                className="bg-bg border-neutral-700 text-text"
                value={info.fullName}
                onChange={handleChange}
                name="fullName"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                className="bg-bg border-neutral-700 text-text"
                value={info.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="space-y-2 bg-bg border-neutral-700">
              <Label htmlFor="country" className="text-text">
                Country
              </Label>
              <Select onValueChange={handleCountryChange}>
                <SelectTrigger className="bg-bg text-text border-neutral-700">
                  <SelectValue
                    placeholder={
                      info.country && info.country.length > 0
                        ? info.country
                        : "Select country"
                    }
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-bg text-text">
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-text">
                Bio
              </Label>
              <Textarea
                className="min-h-[100px] bg-bg border-neutral-700 text-text resize-none"
                id="bio"
                placeholder="Enter your bio"
                value={info.bio}
                onChange={handleChange}
                name="bio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-text">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                className="bg-bg border-neutral-700 text-text"
                value={info.phone}
                onChange={handleChange}
                name="phone"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleUpdate}
              className="ml-auto bg-secondaryCol hover:bg-secondaryCol/80"
              disabled={isPending}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default GeneralSettings;
