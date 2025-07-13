import { Card, CardContent } from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { type ApplicationLog, type ViewApplicationDetail } from '../../../types/api';
import { ApplicationSubmissionPDFIcon, ApplicationSubmissionDownloadPDFIcon } from '~/assets/icons';
import { formatDate } from '~/lib/utils';
import { ApplicationLogDataTable } from './application-log-data-table';
import { useAuth } from '~/providers/AuthProvider';

interface Section {
  title: string;
}
interface ScreeningProps {
  data?: ViewApplicationDetail;
  applicationLogData?: ApplicationLog[];
}

const applicationSections: Section[] = [
  { title: 'Consultation With SCPNG' },
  { title: 'Type of Regulated Activity and Applicant Type' },
  { title: 'For Corporation' },
  { title: 'Prescribed Application Fee' },
  { title: 'Declarations in License Application' },
];

export default function Screening({ data, applicationLogData }: ScreeningProps) {
  const { user } = useAuth();

  const hasHistoryAccess =
    user?.role_ids?.includes(1) ||
    user?.role_ids?.includes(3) ||
    user?.role_ids?.includes(5) ||
    user?.role_ids?.includes(6) ||
    user?.role_ids?.includes(7) ||
    user?.role_ids?.includes(10) ||
    user?.role_ids?.includes(11) ||
    user?.role_ids?.includes(2);

  return (
    <div className="flex w-full gap-3">
      <Card className="flex-1 border rounded-lg p-2 h-[fit]">
        <Tabs defaultValue="details" className="flex-1 py-0 my-0 ">
          <TabsList className="bg-gray-50  p-2 px-1 ">
            <TabsTrigger
              value="details"
              className="flex-1 p-5 border-none px-10 py-4 text-[#99a0ae] data-[state=active]:border-primary data-[state=active]:text-black data-[state=active]:bg-white"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex-1 p-5 border-none px-10  py-4 text-[#99a0ae] data-[state=active]:border-primary data-[state=active]:text-black data-[state=active]:bg-white"
            >
              Documents
            </TabsTrigger>
            {hasHistoryAccess && (
              <TabsTrigger
                value="history"
                className="flex-1 p-5 border-none px-10  py-4 text-[#99a0ae] data-[state=active]:border-primary data-[state=active]:text-black data-[state=active]:bg-white"
              >
                Change History
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="details">
            <Card className="border-0 shadow-none min-h-[280px] m-0 p-0 mt-1">
              <CardContent className="p-0 m-0">
                <Accordion type="single" collapsible className="w-full p-0 m-0 ">
                  {applicationSections?.map((section, index) => (
                    <AccordionItem
                      key={index}
                      value={section.title}
                      className="border-0 bg-gray-50 my-0 mb-3 rounded-lg "
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-100 text-[16px] text-[#444955] font-normal">
                        Section 0{index + 1}: {section.title}
                      </AccordionTrigger>
                      <AccordionContent className="bg-white px-6 py-4">
                        <div className="grid gap-6">
                          <div className="grid gap-3"></div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* section: documents */}
          <TabsContent value="documents">
            <Card className="border-0 shadow-none min-h-[280px] m-0 p-0 mt-1">
              <CardContent className="p-0 m-0">
                <div className="p-0 m-0">
                  {/* documents */}
                  <div
                    className="flex bg-green items-center justify-between p-2 my-2 bg-white border-gray-100 border-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white rounded-md">
                        <ApplicationSubmissionPDFIcon />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{data?.declaration_document_name ?? "Declaration"}.pdf</p>
                        <p className="text-sm text-grey-400">0 KB of {data?.declaration_document_size ?? 120} KB</p>
                      </div>
                    </div>
                    <a
                      href={data?.declaration_document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      <p className="text-[16px] text-grey-700">
                        {formatDate(data?.created_at ?? '', 'timedate')}
                      </p>
                      <ApplicationSubmissionDownloadPDFIcon />
                    </a>
                  </div>

                  <div
                    className="flex bg-green items-center justify-between p-2 my-2 bg-white border-gray-100 border-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white rounded-md">
                        <ApplicationSubmissionPDFIcon />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{data?.expression_of_interest_document_name ?? "Expression_of_interest"}.pdf</p>
                        <p className="text-sm text-grey-400">0 KB of {data?.expression_of_interest_document_size ?? 120} KB</p>
                      </div>
                    </div>
                    <a
                      href={data?.expression_of_interest_document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      <p className="text-[16px] text-grey-700">
                        {formatDate(data?.created_at ?? '', 'timedate')}
                      </p>
                      <ApplicationSubmissionDownloadPDFIcon />
                    </a>
                  </div>

                  {(!data?.expression_of_interest_document && !data?.declaration_document) &&
                    (<div className="flex items-center justify-start p-4">
                      <p className="text-sm text-grey-400">No documents uploaded</p>
                    </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {hasHistoryAccess && (
            <TabsContent value="history">
              <Card className="border-0 shadow-none min-h-[280px] m-0 p-0  mt-1">
                <CardContent className="p-0 m-0">
                  <div className="h-full w-full">
                    <ApplicationLogDataTable data={applicationLogData ?? []} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </Card>

      <Card className="flex-1 border rounded-lg hidden lg:flex">
        <CardContent className="p-6"></CardContent>
      </Card>
    </div>
  );
}
